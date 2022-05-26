import Document, { Head, Html, Main, NextScript } from "next/document";

const MyDocument: React.FC<Document> = (props) => {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Lusitana:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
