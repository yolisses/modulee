npx prisma migrate deploy&&
npx prisma generate&&
# Debugging where to put the prisma missing file
find /vercel -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'&&
cp node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node vercel/path0/.svelte-kit/output/server/chunks &
npm run build;