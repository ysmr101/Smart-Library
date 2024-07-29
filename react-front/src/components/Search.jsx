import React from 'react';

export default function Search() {
  return (
    <form action="submit" style={{ width: '80%' }} method="post">
      <input type="text" style={{ width: '100%' }} /> <br /><br />
      <button type="submit">Submit</button><br /><br />
    </form>
  );
}
