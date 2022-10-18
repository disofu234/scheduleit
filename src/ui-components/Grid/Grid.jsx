import react from "react";
import "./Grid.scss";
import { HorizontalPager } from "ui-components";

export const GridDirections = {
  Column: 'column',
  Row: 'row'
}

const Grid = ({
  style,
  Cell,
  cellProps,
  Header,
  headerProps,
  scrollAndHeaderWrapperClass,
  cellContainerClass,
  maxNumOfElementsInPage
}) => {
  const { direction, paged, headerDirection } = style

  const getHeaderRowOrColumnIfNeeded = () => 
    direction === headerDirection ?
      [<RowOrColumn 
        key={0}
        style={style}
        scrollAndHeaderWrapperClass={scrollAndHeaderWrapperClass} 
        cellContainerClass={cellContainerClass}
       >{headerProps.map((headerProp, ind) => <Header {...headerProp} />)}</RowOrColumn> ] :
      []

  return (
    <PagedWrapper paged={paged} maxNumOfElementsInPage={maxNumOfElementsInPage} direction={direction}>
      {getHeaderRowOrColumnIfNeeded().concat(cellProps.map(
        (cellPropRowOrColumn, ind) => 
          <RowOrColumn
            key={ind + 1}
            style={style}
            scrollAndHeaderWrapperClass={scrollAndHeaderWrapperClass}
            cellContainerClass={cellContainerClass}
            Header={direction !== headerDirection ? Header : null}
            headerProps = {direction !== headerDirection ? headerProps[ind] : null}
          >
            {cellPropRowOrColumn.map(
              (cellProp, innerInd) => <Cell key={innerInd + 1} {...cellProp}></Cell>
            )}
          </RowOrColumn>
      ))}
    </PagedWrapper>
  )
}

const PagedWrapper = ({
  children,
  direction,
  paged,
  maxNumOfElementsInPage
}) => 
  paged ? 
    <HorizontalPager maxNumOfElementsInPage={maxNumOfElementsInPage}>{children}</HorizontalPager> :
    <div className={getPagedWrapperDivClassName(direction)}>{children}</div>

const getPagedWrapperDivClassName = (direction) => {
  const classes = ['paged-wrapper-div']

  direction === GridDirections.Row && classes.push('flex-column')

  return classes.join(' ')
}

const RowOrColumn = ({
  children,
  style: { direction, scrollable, headerScrollable },
  scrollAndHeaderWrapperClass,
  cellContainerClass,
  Header,
  headerProps
}) => {
  const getScrollAndHeaderWrapperClasses = () => {
    const classes = [scrollAndHeaderWrapperClass, 'flex']

    direction === GridDirections.Column && classes.push('flex-column')

    return classes.join(' ')
  }

  const getCellContainerClasses = () => {
    const classes = [cellContainerClass, 'flex']

    direction === GridDirections.Column && classes.push('flex-column')
    scrollable && classes.push('scrollable')

    return classes.join(' ')
  }

  return (
    <div className={getScrollAndHeaderWrapperClasses()}>
      {!headerScrollable && Header && <Header {...headerProps} />}
      <div className={getCellContainerClasses()}>
        {headerScrollable && Header && <Header key={0} {...headerProps} />}
        {children}
      </div>
    </div>
  )
}

export default Grid