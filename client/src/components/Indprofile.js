import React from 'react'

function Indprofile({match}) {
  return (
    <div>
      <div>username: {match.params.username}</div>
      <div>email: {match.params.email}</div>
    </div>
  );
}

export default Indprofile