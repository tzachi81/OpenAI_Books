/// <reference types="vite/client" />

/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

VITE_API_URL="https://freetestapi.com/api/v1/books"