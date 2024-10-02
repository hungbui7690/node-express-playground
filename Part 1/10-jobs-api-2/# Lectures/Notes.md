# Heroku Info

- Ko giống như Heroku, một số hosting khác như Digital Ocean, Linode... sẽ cần phải setup 1 số thứ trước (NginX, Firewall...) khi chạy. Trong khi với testing, chúng ta chỉ cần push lên Heroku là đủ

- Một số free host: Netlify, Vercel... nhưng hữu dụng với Front End app >>> với Backend hoặc Fullstack app, Heroku thực sự hữu dụng.

- Và dưới đây là 3 thằng có thể thay thế Heroku: https://www.youtube.com/watch?v=MusIvEKjqsc

  1. render.com

     > có thể deploy node.js, python, docker app, graphQL
     > Web Services sẽ bị spun down sau 15p of inactivity >>> nhưng khi có requst sẽ tự spins up >> delay khoảng 30s

  2. railway.app
  3. cyclic.sh

///////////////////////////////

- Up lên Heroku cần:

  - Tạo tài khoản Heroku
  - Git
  - Heroku CLI

Google và cài Heroku CLI >> sau khi cài xong >> heroku -v xem đã install chưa
