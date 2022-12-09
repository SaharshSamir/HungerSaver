interface Location {
  address: string,
  name: string,
  map: string,
  contact: string
}


const Locations = () => {
  return (
    <div>
      <p>Warehouse Locations</p>
      
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Ordered At</th>
                <th>Food Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                  <tr key={idx}>
                  </tr>
            </tbody>
          </table>
    </div>
  )
}

export default Locations;
