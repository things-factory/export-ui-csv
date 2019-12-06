import { UPDATE_EXTENSION } from '@things-factory/export-base'
import { store } from '@things-factory/shell'
import { Parser } from 'json2csv'

async function jsonToCsv({ extension, data, name }) {
  const records = typeof data == 'function' ? await data.call() : data

  const fields = Object.keys(records[0])
  const parser = new Parser({ fields })
  const csv = parser.parse(records)

  const link = document.createElement('a')

  link.setAttribute('href', encodeURI('data:text/csv;charset=utf-8,' + csv))
  link.setAttribute('download', `${name}.csv`)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function bootstrap() {
  store.dispatch({
    type: UPDATE_EXTENSION,
    extensions: {
      csv: {
        export: jsonToCsv
      }
    }
  })
}
