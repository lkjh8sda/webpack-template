//기본적인 웹팩의 구성옵션 설정 -- parcel은 구성옵션 따로 없이 자동화됨 웹팩은 수동으로 해야함
//webpack.config.js파일은 브라우저 환경이 아닌 node.js환경에서 작동

//import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

//export
module.exports = {
    //parcel main.js 와 유사함
    //파일을 읽어들이기 시작하는 진입점 설정
    entry: './js/main.js',

    // 결과물(번들)을 반환하는 설정
    output: {
        //경로는 node.js에서 필요로하는 절대경로로 설정해야함
        //.resolve : 첫 번째 인수와 두 번째 인수의 경로를 합쳐주는 역할을함
        //즉. dist라는 폴더에 main.js라는 파일이름으로 엔트리에 진입점으로 사용한 ./js/main.js 파일에 연결된 모든 내용을 가져와서 main.js라는 이름으로 사용할 수 있다.
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',
        //빌드 돌리면 기존 결과물 삭제후 생성
        clean: true
    },

    module:{
        rules: [{
            test: /\.s?css$/, // s라는 단어가 있을수도 있고 .css로 끝나는 모든 파일
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.js$/,
            use:[
                'babel-loader'
            ]
        }
    ]
    },

    //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
            template: './index.html'

        }),
        new CopyPlugin({
            patterns:[
                {from: 'static'}
            ]
        })
    ],
    devServer:{
        host: 'localhost'
    }
}