# database

```

users : {
  uid: {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    nickname: string;
  }
}

diaries: {
  diaryId: {
    id: string;
    uid: string;
    date: number;
    index: number;
    title: string;
    content: string;
  }
}


diary에 content빼고 다 가지고 있도록 한다.
content같은 경우에는 stroage로 뺀다.

저장하는 경우에는 data에는 빼두도록 하고,

diary.data.title
diary.content
이런 식으로 하는게 좋지 않을까 싶다.




```

# stroage

```
diaries/id(content text파일)

```
