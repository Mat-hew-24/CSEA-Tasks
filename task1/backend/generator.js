import { faker } from '@faker-js/faker'
import { randomInt } from 'crypto'

function generateFromSchema(schema) {
  const result = {}
  const imageLinks = [
    'https://picsum.photos/200',
    'https://picsum.photos/300',
    'https://picsum.photos/400/300',
    'https://picsum.photos/seed/picsum/300/300',
    'https://picsum.photos/500/300',

    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',

    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',

    'https://via.placeholder.com/150',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/300x300?text=Image',

    'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
  ]

  for (const key in schema) {
    const type = schema[key].toLowerCase()

    switch (type) {
      case 'number':
        result[key] = faker.number.int({ min: 1, max: 100 })
        break
      case 'string':
        result[key] = faker.string.alpha(5)
        break
      case 'email':
        result[key] = faker.internet.email()
        break
      case 'name':
        result[key] = faker.person.fullName()
        break
      case 'phone':
        result[key] = faker.phone.number()
        break
      case 'boolean':
        result[key] = faker.datatype.boolean()
        break
      case 'uuid':
        result[key] = faker.string.uuid()
        break
      case 'image_url':
        result[key] = imageLinks[randomInt(imageLinks.length)]
        break
      default:
        result[key] = null
    }
  }

  return result
}

export default generateFromSchema
