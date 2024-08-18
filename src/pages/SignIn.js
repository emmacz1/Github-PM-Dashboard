import React from 'react';

const clientId = 'Iv23ctgNR8Zl7kXLZziQ';
const redirectUri = 'http://localhost:3000/auth/callback';

function SignIn({ onSignIn }) {
  const handleSignIn = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    onSignIn();
  };

  return (
    <div className="signin">
      <button onClick={handleSignIn}>Sign In with GitHub</button>
    </div>
  );
}

export default SignIn;
