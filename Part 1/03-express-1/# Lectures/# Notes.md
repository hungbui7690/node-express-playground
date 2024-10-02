https://course-api.com/slides/

# HTTP Request Response Cycle

- Servers = Computers which contain resources (make sure resources are always available)
- Cloud = multiple computers connected together

- Client gửi Request Message tới Server, và Server gửi lại Response Message về Client
- Và ở Server, chúng ta sử dụng Node / Express để handle request

# HTTP Message

- Request Message is what user sends (mở trình duyệt và mở 1 trang web bất kỳ >> đó là send request)
- Và nhiệm vụ của chúng ta (Devs) là tạo ra server để handle những req đó và gửi trả lại response message

> > Request Message:

- Startline:

  - Method: GET, POST, PUT, PATCH, DELETE
  - HTTP Version
  - URL
    > > chúng ta chỉ quan tâm tới Method và URL là chính

- GET là default request mà user performs
- URL là tên trang web, hoặc nói rõ là /, /about, /orders....
- Headers trong Request Message là Optional >>> chỉ một số trường hợp mới cần chúng ta phải quan tâm >> chứa meta-data
- Optional Body:
- nếu user request và chỉ muốn resource >> ko có body
- Nếu user muốn add resouce onto our server >> phải có body >> phải có data (also call payload)

> > Response Message:

- Chú ý content type:
  - text/html (thường sẽ là thằng này)
  - JSON data

# Remove .git folder

- rmdir -Force -Recursive .git
- rd /s /q .git

# Express Info

https://expressjs.com/

- ko phải official created by node
- express là chuẩn để create nodejs website

> > npm install express --save >> lý do có --save là vì ở những version cũ, nếu ko có --save thì sẽ ko lưu vào trong package.json

# API vs SSR

Khi sử dụng Express, thường chúng ta sẽ làm 2 điều sau:

    1. Setup API

    - Khi nói tới setup API >> chúng ta setup HTTP interface to interact with our data (JSON) >> server sẽ cung cấp data
    >> res.json()

    2. SSR

    - Setup template & send back entire HTML và styles
    >> res.render()
