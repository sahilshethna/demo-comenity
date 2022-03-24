function Card({user}) {
    // console.log(user);
    // console.log(header);
    return(
        <>
            <p>Card Data</p>
        {user.map((userdata) =>{
      return (
        <div key={userdata.id}>
          <p>{userdata.name}</p>
          <p>{userdata.email}</p>
        </div>
          )
      })
    }
            
        </>
    )
}

export default Card