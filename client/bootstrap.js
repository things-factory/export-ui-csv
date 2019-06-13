import { UPDATE_EXTENSION } from '@things-factory/export-base'
import { store } from '@things-factory/shell'
import { Parser } from 'json2csv'

function jsonToCsv(params) {
  const fields = Object.keys(params.data[0])
  const parser = new Parser({ fields })
  const csv = parser.parse(params.data)

  const link = document.createElement('a')
  link.setAttribute('href', encodeURI('data:text/csv;charset=utf-8,' + csv))
  link.setAttribute('download', `${params.name}.csv`)
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
