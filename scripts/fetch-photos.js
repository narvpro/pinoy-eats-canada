import 'dotenv/config'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_FILE = join(ROOT, 'src/data/restaurants.json')
const IMAGES_DIR = join(ROOT, 'public/images')
const DELAY_MS = 250

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
if (!API_KEY) {
  console.error('\n❌ Error: GOOGLE_PLACES_API_KEY not set in .env\n')
  console.error('Create a .env file with:\n  GOOGLE_PLACES_API_KEY=your_key_here\n')
  process.exit(1)
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function findPlaceId(name, address, city) {
  const query = `${name} ${address} ${city} Canada`
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
    `?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name&key=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Places search HTTP ${res.status}`)
  const data = await res.json()
  if (data.status === 'REQUEST_DENIED') throw new Error(`API denied: ${data.error_message}`)
  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].place_id
  }
  return null
}

async function getPhotoReferences(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}&fields=photos&key=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Place details HTTP ${res.status}`)
  const data = await res.json()
  if (data.status === 'REQUEST_DENIED') throw new Error(`API denied: ${data.error_message}`)
  if (data.result && data.result.photos) {
    return data.result.photos.slice(0, 3).map(p => p.photo_reference)
  }
  return []
}

async function downloadPhoto(photoRef, destPath) {
  const url = `https://maps.googleapis.com/maps/api/place/photo` +
    `?maxwidth=800&photoreference=${photoRef}&key=${API_KEY}`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`Photo download HTTP ${res.status}`)
  const buffer = await res.arrayBuffer()
  writeFileSync(destPath, Buffer.from(buffer))
}

async function main() {
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true })
    console.log(`Created ${IMAGES_DIR}`)
  }

  const raw = readFileSync(DATA_FILE, 'utf-8')
  const data = JSON.parse(raw)
  const restaurants = data.restaurants

  let updated = 0
  let failed = 0
  const noListing = []
  const errors = []

  console.log(`\nFetching photos for ${restaurants.length} restaurants...\n`)

  for (const restaurant of restaurants) {
    console.log(`→ ${restaurant.name}`)

    try {
      // Step 1: get or find Place ID
      if (!restaurant.placeId) {
        process.stdout.write('  Finding Place ID... ')
        restaurant.placeId = await findPlaceId(
          restaurant.name,
          restaurant.address,
          restaurant.city
        )
        await sleep(DELAY_MS)

        if (!restaurant.placeId) {
          console.log('⚠️  no listing found')
          noListing.push(restaurant.name)
          failed++
          continue
        }
        console.log(`✓ ${restaurant.placeId}`)
      } else {
        console.log(`  Place ID cached: ${restaurant.placeId}`)
      }

      // Step 2: fetch photo references
      process.stdout.write('  Fetching photo refs... ')
      const photoRefs = await getPhotoReferences(restaurant.placeId)
      await sleep(DELAY_MS)

      if (photoRefs.length === 0) {
        console.log('⚠️  no photos on listing')
        noListing.push(restaurant.name)
        failed++
        continue
      }
      console.log(`✓ ${photoRefs.length} photo(s)`)

      // Step 3: download each photo
      const localPaths = []
      for (let i = 0; i < photoRefs.length; i++) {
        const filename = `${restaurant.id}-${i + 1}.jpg`
        const destPath = join(IMAGES_DIR, filename)
        process.stdout.write(`  Downloading photo ${i + 1}/${photoRefs.length}... `)
        await downloadPhoto(photoRefs[i], destPath)
        localPaths.push(`/images/${filename}`)
        await sleep(DELAY_MS)
        console.log('✓')
      }

      // Step 4: update restaurant record
      restaurant.photos = localPaths
      restaurant.imageUrl = localPaths[0]
      updated++
      console.log(`  ✅ Saved ${localPaths.length} photo(s)`)
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`)
      errors.push({ name: restaurant.name, error: err.message })
      failed++
    }
  }

  // Save updated JSON (preserve formatting)
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  console.log('\n  restaurants.json updated ✓')

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log(`✅  Updated: ${updated} restaurants`)
  console.log(`❌  Failed:  ${failed} restaurants`)

  if (noListing.length > 0) {
    console.log('\n⚠️  No Google listing found (needs manual photo):')
    noListing.forEach(n => console.log(`   - ${n}`))
  }
  if (errors.length > 0) {
    console.log('\n⚠️  Errors:')
    errors.forEach(({ name, error }) => console.log(`   - ${name}: ${error}`))
  }

  console.log('\nDone. Run `npm run build` and redeploy to publish the new photos.')
}

main().catch(err => {
  console.error('\nFatal error:', err.message)
  process.exit(1)
})
