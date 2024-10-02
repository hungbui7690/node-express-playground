# Intro

- với project này, chúng ta sẽ học:
  1. làm sao để kết nối tới db
  2. CRUD
  3. Khóa học này là Backend >>> ko phải project nào cũng có Front End

# REST API

- Tại sao chúng ta setup kiểu như bên dưới:
  GET ------- api/tasks ----------- Get All Tasks
  POST ------ api/tasks ----------- Create Task
  GET ------- api/tasks/:id ------- Get Task
  PUT/PATCH - api/tasks/:id ------- Update Task
  DELETE ---- api/tasks/:id ------- Delete Task

  > > bởi vì chúng ta đang build REST API >>> Server Interface >>> dùng để cho những app khác sử dụng data của chúng ta

- REST API: Representational State Transfer >>> most popular API design patterns > > > Pattern này combine API Verbs, route paths & resources (data) >> determine how API looks like
- vì là pattern >> ko bắt buộc >> design theo pattern nào cũng đc >> miễn là phải consistent

# MONGO DB INTRO

- No SQL, Non Relational DB
- Store JSON
- Easy to get started
- Free Cloud Hosting - Atlas >>> mặc dù có thể setup MongoDB trên local, nhưng cuối cùng cũng phải up lên cloud >>>> học thằng trên cloud

> > Google: create mongodb atlas
> > Check MongoDB-Smilga.pdf

# DB, Network Access & Connection String

> > Check MongoDB-Smilga.pdf
