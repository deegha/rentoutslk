import React from 'react';

const Page = () => {
  const isLogin = false;
  return (
    <div>
      Authd
      <div>
        {!isLogin ? <div>It s Loggin</div> : <div>It&apos;s Not logined</div>}
      </div>
    </div>
  );
};

export default Page;
