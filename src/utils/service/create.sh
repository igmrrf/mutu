#!/bin/bash  

## PARAMETERS [$1 $2] for example: to create route files for payment

## run `bash ./create.sh payment Payment`

# 1. Create Route Folder
mkdir -p -v src/containers/$1/spec


# 3. Create spec files
touch src/containers/$1/spec/$2Repository.spec.js
touch src/containers/$1/spec/$2.spec.js
touch src/containers/$1/spec/MOCK_DATA.js

# 2. Create CRUD Files
touch src/containers/$1/$2Controller.js
touch src/containers/$1/$2Entity.js
touch src/containers/$1/$2Model.js
touch src/containers/$1/$2Repository.js
touch src/containers/$1/$2Route.js
touch src/containers/$1/$2Validation.js

node src/utils/service/index.js $1 $2


