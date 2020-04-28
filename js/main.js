/* jshint curly:true, debug:true */
/* globals $, firebase */


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA10TxPB4WfDeYh4q1uCpNtcOtb3TxrrQg",
  authDomain: "self-chat-79c73.firebaseapp.com",
  databaseURL: "https://self-chat-79c73.firebaseio.com",
  projectId: "self-chat-79c73",
  storageBucket: "self-chat-79c73.appspot.com",
  messagingSenderId: "325102665362",
  appId: "1:325102665362:web:f5cc49c8a447745fa7704b",
  measurementId: "G-P2TFJLCRFV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// 初期値を設定
let num = 0;

const getValue = () => {
  // 現在のmykeyの値を取得
  firebase
    .database()
    .ref('mykey')
    .on('value', (snapshot) => {
      // データの取得が完了すると実行される

      const snapshotValue = snapshot.val();

      // 取得した値が数値かを判定
      if (Number.isFinite(snapshotValue)) {
        num = snapshotValue;
      }

      console.log(`Got value: ${num}`);
    });
};

const setValue = () => {
  num += 1;
  console.log(`set: ${num}`);

  // Firebase上のmykeyの値を更新
  firebase
    .database()
    .ref('mykey')
    .set(num);
};

const logIn = () => {
  firebase
    .auth()
    .signInAnonymously() // 匿名ログインの実行
    .catch((error) => {
      // ログインに失敗したときの処理
      console.error('ログインエラー', error);
    });
};

// ユーザのログイン状態が変化したら呼び出される、コールバック関数を登録
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('ログインしました');
    getValue();
  } else {
    console.log('ログインしていません');
    logIn();
  }
});

// id="my-button"をクリックしたら呼び出される、イベントハンドラを登録
$('#my-button').on('click', () => {
  setValue();
});