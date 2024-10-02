/*
	Why package.json is important when sharing code to Github
	- because we don't want to share node_modules/ => create .gitignore 
	- when other people download the project from github => can install packages using package.json => just need to run "npm install" 


*************************

	Nodemon
	- no need to restart server after every changes
			> npm i nodemon -D
			> npm i nodemon --save-dev

	- why dev dependency
		> because in the real server, we don't need nodemon

	- after install, need to change the script in package.json
			"scripts": {
					"start": "node app.js",
					"dev": "nodemon app.js"
			}
	- now, we just need to run
		+ "npm start" will run "node app.js"
		+ "npm dev" will run "nodemon app.js"


*************************

	Uninstall Packages
	- Nuclear Approach: delete /node_modules => then delete package-lock.json
		+ we need to know this way since when working with Gatsby, after remove package, we also need to clear cache folder => need to delete 2 places 

	- npm uninstall <packageName>


*************************

	Install Packages Globally 
	- npm install -g nodemon
	- khi work với gatsby sẽ gặp global gatsby-cli tool >> 1 số package như Strapi và React bắt phải cài Globally >>> nhưng mọi thứ thay đổi từ khi có npx >>> npm create-react-app >> tự động install globally 
	- nếu sử dụng node version 5.2 trở lên thì chỉ cần sử dụng "npx <packageName>"


*************************

	package-lock.json
	- nếu check package.json sẽ thấy có deps (dependencies) version >> và 1 số deps sẽ cần những deps khác để chạy >> và khi share codes, chúng ta muốn devs khác sử dụng ko chỉ đúng deps mà còn phải đúng các deps đi kèm khác nữa >> nếu đúng version bootstrap, nhưng khác version JQUERY >> obsolete (bugs)
			> vì vậy có package-lock.json >> chứa thông tin các deps phụ thuộc (deps con)

	- package.json giống như contract giữa chúng ta và người tạo ra deps 
			"lodash": "^4.17.20" >>> 4 = major version, 17 = minor version, 20 = patch (bug fix)
			>> https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/

*/

const _ = require('lodash')

const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]]]
const newArr = _.flattenDeep(arr)
console.log(newArr)
