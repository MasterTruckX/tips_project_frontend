const WaiterObj = ({waiter}) => {
  return (
    <>
    <div className="card border-secondary mb-3" style={{maxWidth: '20rem'}}>
        <div className="card-header">{waiter.name}</div>
        <div className="card-body">
            {/* <h4 className="card-title">Secondary card title</h4> */}
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <ul>
                <li className="card-text">Tip from check: ${waiter.checkTip}</li>
                <li className="card-text">Tip paid: ${waiter.paidTip}</li>
            </ul>
        </div>
    </div>

    </>
  )
}

export default WaiterObj