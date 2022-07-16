export const MINUTE_GRANULARITY = 15

export const TimePickerGridStyle = {
  direction: 'column',
  paged: true,
  scrollable: true,
  headerDirection: 'row',
  headerScrollable: false
}

export const groupBy = (array, groupFunc) => {
  const groupsObj = {}

  array.forEach(x => {
    const groupingKey = groupFunc(x)

    if (groupsObj[groupingKey]) {
      groupsObj[groupingKey].push(x)
    } else {
      groupsObj[groupingKey] = []
      groupsObj[groupingKey].push(x)
    }
  })

  return [Object.keys(groupsObj), Object.values(groupsObj)]
}

export const Header = ({
  dateObj
}) =>
  <div className="header">
    <b className="header-text small">
      {dateObj.toFormat('MMM')}
    </b>
    <br/>
    <b className="header-text big">
      {dateObj.toFormat('ccc').toUpperCase()}
    </b>
    <br />
    <b className="header-text small">
      {dateObj.toFormat('d')}<sup className="sup-text">{getDateOrdinal(dateObj)}</sup>
    </b>
  </div>

const getDateOrdinal = (date) => {
  const dateInt = parseInt(date.toFormat('d'))
  switch (dateInt) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}