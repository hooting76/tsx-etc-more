# 11월 17일
 1. Wine 설치
 -- Wine is not emulator --
  - wine은 Linux와 같은 Unix 계열 운영체제에서 윈도우즈 프로그램을 실행할 수 있도록 해주는 호환성 계층(compatibility layer)다.
  - 즉, 윈도우에서의 동작을 재구성해서 리눅스에서 직접 실행될 수 있도록 하는 방식.(일종의 컨버팅?)   

  ```bash
    sudo apt update # wine 설치 과정
    sudo apt install wine
  ```   

  - 설치 이후, 별도의 기본적인 설정을 할 수 있다.(winecfg)
  (윈도우즈 환경 설정 + 필요한 라이브러리 드라이버 설치 가능)   


  2. wine을 활용하여 카카오톡 설치   
   1) 우선 윈도우 버전의 카카오톡 설치파일을 다운로드하여 준비한다.(exe 파일...;;)   
   2) 이후, 터미널에 다음 명령어를 입력해주고 실행.   
   ```bash
    LANG="ko_KR.UTF-8" wine kakaoTalk_Setup.exe
   ```   
   3) 이후 과정은 윈도우 설치과정과 동일하다.   
    - 다만, 속도가 좀 느리다...   
  

  3. 타입스크립트로 카페 키오스크 페이지 코드 짜보기
   - 타입을 생성하고 import하여 타입을 준수하여 짜보는거 해보는중...   
   
  
  4. GIMP 설치   
   - 우분투 환경에서는 포토샵 프로그램으로 GIMP 가 그역할을 하고있다.   
   ```bash
    sudo apt update
    sudo apt install gimp
   ```   

   5. Remmina 설치
    - 집에 있는 미니PC 원격연결이 필요할수도 있어서 원격연결 방법을 찾던중 해당 프로그램을 찾게 되었다.
    ``` bash   
      # Remmina 수동 설치하기
      $ sudo snap install remmina
    ```   

    - 이후 어떤 경고문이 뜰텐데, snap 으로 설치할 경우에 대한 보안상의 이유로 명시해준다.   
    - 따라서, 수동으로 제한을 풀어주는작업을 진행했다.   

    ``` bash
      # Remmina permission settings
      $ sudo snap connect remmina:audio-record :audio-record
      $ sudo snap connect remmina:avahi-observe :avahi-observe
      $ sudo snap connect remmina:cups-control :cups-control
      $ sudo snap connect remmina:mount-observe :mount-observe
      $ sudo snap connect remmina:password-manager-service :password-manager-service
    ```   

    - 이후 프로그램 실행 후, 프로토콜값을 RDP로 바꿔준 이후, ip주소와 유저정보를 입력하여 원격연결에 성공했다.   
    



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
