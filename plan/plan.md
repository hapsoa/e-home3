```
firestore와
storage로 구분하는게 아니라,

class별로
user, board, ... 등으로 설계를 해야할 듯 하다.

메인페이지 화면에 뭘 만들면 좋을까

private public group 모드를 차례대로 보여줄까

헤더 오른쪽 기능중에서 로그아웃, 옵션(mode들 간 위치 바꾸기)

--

회원관리는 내가 관리를 한다. 일단은.
모든 사람들에게 공개할 수가 없다. 비용문제.

많은 사람들이 함께써주면 더없이 좋겠지만

--

User class는 1)유저 정보들을 관리해준다.
2)로그인 기능
3)로그아웃 기능이 있다.

firebase.auth.db.create()
firebase.boardPost.db.create()

--


defaultApi를 제거하는게 좋으려나?







```
