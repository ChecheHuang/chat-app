# step 1

npm i

# step 2

cd client
npm i

# step 3

vim node_modules/react-scripts/config/paths.js

# step 4

:32,32s/\v<build>/..\/public/g

# step 5

:wq!

# step 6

npm run build
