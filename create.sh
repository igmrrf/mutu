#!/bin/bash  

## PARAMETERS [$1 $2] for example: to create route files for payment

## run `bash ./create.sh payments Payment`

# 1. Create Route Folder
mkdir src/app/$1

# 2. Create CRUD Files
touch src/app/$1/Create$2.js
# src/app/payments/CreatePayment.js
touch src/app/$1/Delete$2.js
# src/app/payments/DeletePayment
touch src/app/$1/Get$2.js
# src/app/payments/GetPayment
touch src/app/$1/Get$2s.js
# src/app/payments/GetPayments
touch src/app/$1/Update$2.js
# src/app/payments/UpdatePayment


# 3. Create entity and spec under domain
touch src/domain/entities/$2.js
# src/domain/entities/Payment.js
touch src/domain/entities/spec/$2.spec.js
#src/domain/entities/spec/Payment.spec.js

# 4. create Route Model insde base/database
touch src/base/database/models/$2Model.js
# src/base/database/models/PaymentModel.js

# 5. Create Route Repository under base/repositories
touch src/base/repositories/$2Repository.js
# src/base/repositories/PaymentRepository.js
touch src/base/repositories/spec/$2Repository.spec.js
# src/base/repositories/spec/PaymentRepository.spec.js

# 6. Create Route controller under interface/http/controllers
touch src/interfaces/http/controllers/$2Controller.js
# src/interfaces/http/controllers/PaymentController.js

# 7. Create Route routes under interface/http
touch src/interfaces/http/routes/v1/$1.js
# src/interfaces/http/routes/v1/payments.js

# 8. create Route validation under interfaces/http
touch src/interfaces/http/validations/$1.validation.js
# src/interfaces/http/validations/payments.validation.js


