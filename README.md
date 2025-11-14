# 11월 14일
 1. 가지고있던 노트북 하나를 다 밀고 우분투를 설치했다...
  - refus 로 부팅용 usb(8기가 이상) 하나 포맷해주고 우분투 iso 파일로 구워서 노트북에 설치
  - 스펙사항:
    - Ubuntu 24.04.3 LTS
    - Acer Aspire E5-576
    - Intel® Core™ i5-8250U × 8
    - memory : 16.0 GiB

  - 설치 및 세팅
    1) Vim
    ``` bash
      $ sudo apt-get update
      $ sudo apt-get install vim
    ```   

    2) Git
    ```bash
      $ sudo apt update
      $ sudo add-apt-repository ppa:git-core/ppa
      $ sudo apt update
      $ sudo install git

      # git이 정상 설치됐는지 확인
      $ git version

      # 유저명과 이메일 주소 설정
      $ git config --global user.name name
      $ git config --global user.email name@email.com

      # 유저명과 이메일 주소 확인
      $ git config user.name
      $ git config user.email
    ```
  
    3) 우분투 vscode에서 한글 입력 안됐던 문제... 
    - https://gist.github.com/philoskim/a79440bd51ae40f04a4d7cafa472caf1
    - 결론: snap(앱센터) 으로 설치하지 말고 전통적인 방식을 고수하자...   

    4) 이외 여럿 설치 항목도 있지만 충분히 구글링 하면서 해결완료   

    <hr/>

 2. 리액트 타입스크립트 학습시작
  - 깃허브 : https://github.com/hooting76/tsx-etc-more   
  - 내용   
    1) 타입스크립트는 input/output 각각 타입을 분명하게 명시해야 한다.   
    2) 이러한 타입중에 객체형태의 타입은 따로 ts파일로 저장해서 사용하며, model 이란 폴더명으로 관리한다.
    3) type 과 interface 의 타입이 각각 존재하며, 차이는 다음과 같다.   


-------------------------------------------------
| 구분 | `interface` | `type` |
|------|-------------|--------|
| **선언 병합** | ✅ 가능 (같은 이름으로 여러 번 선언 시 자동 병합) | ❌ 불가능 (중복 선언 시 에러) |
| **확장 방식** | `extends` 키워드 사용 | `&` (인터섹션) 사용 |
| **Union 타입** | ❌ 불가능 | ✅ 가능 (`string \| number`) |
| **Tuple 타입** | ❌ 불가능 | ✅ 가능 (`[string, number]`) |
| **Primitive 별칭** | ❌ 불가능 | ✅ 가능 (`type ID = string`) |
| **Mapped Types** | ❌ 불가능 | ✅ 가능 |
| **객체 타입 정의** | ✅ 가능 | ✅ 가능 |
| **성능** | 약간 더 빠름 (캐싱 최적화) | 약간 느림 |   
--------------------------------------------------   

## 정리

--------------------------
| 상황 | 추천 |
|------|------|
| **공개 API/라이브러리** | `interface` (사용자가 확장 가능) |
| **React Props/State** | `interface` (명확한 에러 메시지) |
| **일반 객체 타입** | `interface` |
| **Union/Intersection** | `type` |
| **Tuple 타입** | `type` |
| **Utility/Helper 타입** | `type` |
| **복잡한 타입 조합** | `type` |
---------------------------

## 예시 : 확장 (Extension)   
```typescript
// interface
interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}

// type
type Animal = {
  name: string;
}
type Dog = Animal & {
  bark(): void;
}
```
