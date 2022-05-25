import Document, { Head, Html, Main, NextScript } from "next/document";

const MyDocument: React.FC<Document> = (props) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap"
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
