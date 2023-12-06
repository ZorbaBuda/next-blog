import config from "@/data/config.json";
export default function Head() {
  return (
    <head>
    {/* responsive meta */}
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5"
    />

    {/* favicon */}
    <link rel="shortcut icon" href={config.site.favicon} />
    {/* theme meta */}
    <meta name="theme-name" content="Blog" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta
      name="theme-color"
      media="(prefers-color-scheme: light)"
      content="#fff"
    />
    <meta
      name="theme-color"
      media="(prefers-color-scheme: dark)"
      content="#000"
    />

    {/* google font css */}
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    {/* <link
      href={`https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`}
      rel="stylesheet"
    /> */}
  </head>
  )
}
