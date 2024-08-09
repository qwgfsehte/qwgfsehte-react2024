import { Link } from '@remix-run/react';

export default function ErrorPage404() {
  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
        bottom: '0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '45px', margin: '0' }}>404</h1>
        <h2>Not Found</h2>
        <img
          src="/src/assets/imgs/img-for-error-page.png"
          alt="pokemon-error"
          style={{
            width: '300px',
          }}
        />
        <p>{`This page doesn't exist.`}</p>
        <Link
          style={{
            border: '1px solid',
            textDecoration: 'none',
            borderRadius: '6px',
            padding: '10px',
            color: 'black',
          }}
          to="/search/page/1"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}
