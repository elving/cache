import request from 'request'
import cheerio from 'cheerio'
import { unique } from 'lodash'

const infiltrator = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      jar: true,
      gzip: true,
      timeout: 30000,
      useQuerystring: true,
      followAllRedirects: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'en-US,en;q=0.8,es;q=0.6,fr;q=0.4'
      }
    }

    request(options, (error, response, body) => {
      if (error) {
        reject(error)
      } else if (body) {
        let title = ''
        let images = []
        let description = ''
        const $ = cheerio.load(body)

        // Get Title
        const $title = $('title')
        const $ogTitle = $('meta[name="og:title"]')
        const $firstHeading = $('h1').eq(0)

        if ($title && $title.length) {
          title = $title.text()
        } else if ($ogTitle && $ogTitle.length) {
          title = $ogTitle.attr('content')
        } else if ($firstHeading && $firstHeading.length) {
          title = $firstHeading.text()
        }

        // Get Description
        const $description = $('meta[name="description"]')
        const $ogDescription = $('meta[name="og:description"]')
        const $firstParagraph = $('p').eq(0)

        if ($description && $description.length) {
          description = $description.attr('content')
        } else if ($ogDescription && $ogDescription.length) {
          description = $ogDescription.attr('content')
        } else if ($firstParagraph && $firstParagraph.length) {
          description = $firstParagraph.text()
        }

        // Get Images
        const $ogImage = $('meta[property="og:image"]')
        const $twitterImage = $('meta[property="twitter:image:src"]')

        if ($ogImage && $ogImage.length) {
          images.push($ogImage.attr('content'))
        }

        if ($twitterImage && $twitterImage.length) {
          images.push($twitterImage.attr('content'))
        }

        $('img').each((index, img) => {
          const $img = $(img)

          if ($img && $img.length) {
            images.push($img.attr('src'))
          }
        })

        images = unique(images)

        resolve({ title, description, images })
      }
    })
  })
}

export default infiltrator
