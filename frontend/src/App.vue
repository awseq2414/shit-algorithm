<template>
    <div id="app">
        <div id="menu" class="ui secondary menu" v-bind:class="{menu_show: scrollMenu }">
            <ul id="mainmn">
                <li><router-link to="/" :class="{menu_show_font : scrolled > 200}">MAIN</router-link></li>
            </ul>
            <ul id="submn">
              <li><router-link to="/notice" :class="{menu_show_font : scrolled > 200}">공지사항</router-link></li>
              <li><a v-on:click="problemLoginCheck" :class="{menu_show_font : scrolled > 200}">문제 풀기</a></li>
              <li><a v-on:click="rankLoginCheck" :class="{menu_show_font : scrolled > 200}">랭킹</a></li>
              <li v-if="loginState">
                <router-link v-if="userRating == 3" to="/admin" :class="{menu_show_font : scrolled > 200}">관리자페이지 - {{username}}님</router-link>
                <router-link v-else to="/mypage" :class="{menu_show_font : scrolled > 200}">{{username}}님</router-link>
                <router-link to="/" @click="logout" :class="{menu_show_font : scrolled > 200}">로그아웃</router-link>
              </li>
                <li v-if="loginState == false"><a @click="openModal" :class="{menu_show_font : scrolled > 200}">SIGN</a></li>
            </ul>
        </div>
        <div v-if="loginState == false" id="sign">
            <div class="ui modal">
                <i class="close icon" v-on:click="closeModal"></i>
                <div class="login_form" v-if="signState">
                    <div class="description">
                        <div class="ui two column centered grid">
                            <div class="container">
                                <div class="culnmn">
                                    <h1 class="ui grey header">로그인</h1>
                                    <form class="ui large form">
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="user icon"></i>
                                                <input type="text" name="userid" placeholder="아이디" v-model="userid" v-on:keydown.enter="submit">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="lock icon"></i>
                                                <input type="password" name="password" placeholder="비밀번호" v-model="password" v-on:keydown.enter="submit">
                                            </div>
                                        </div>
                                        <button type="button" v-on:click="submit" class="ui fluid large teal submit button submitButton">
                                            로그인
                                        </button>
                                    </form>
                                    <button v-on:click="signState = false" class="ui button black signButton">
                                        회원가입하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="register_form" v-else>
                    <div class="description">
                        <div class="ui two column centered grid">
                            <div class="container">
                                <div class="culnmn">
                                    <h1 class="ui grey header">회원가입</h1>

                                    <form class="ui large form">
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="user icon"></i>
                                                <input type="text" name="userid" placeholder="아이디" v-model="userid">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="lock icon"></i>
                                                <input type="password" name="password" placeholder="비밀번호" v-model="password">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="user icon"></i>
                                                <input type="text" name="username" placeholder="이름" v-model="username">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <i class="student icon"></i>
                                                <input type="text" name="studentcode" placeholder="학번" v-model="studentcode" v-on:keypress="isNumber(event)">

                                            </div>
                                        </div>
                                        <div v-on:click="submit" v-on:keyup.enter="submit" class="ui fluid large teal submit button submitButton">
                                            회원가입
                                        </div>
                                    </form>
                                    <button v-on:click="signState = true" class="ui button black signButton">
                                        로그인하기
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
      <transition name="sigoPage" mode="out-in">
      <router-view></router-view>
      </transition>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'sigo',
    data() {
      return {
        loginState: false,
        signState: true,
        userid: '',
        password: '',
        username: '',
        studentcode: '',
        loginResult: '',
        userToken: '',
        userRating: '',
        linkInfo: '',
        scrolled: false,
        scrollMenu: false,
        solveMenu: false,
        on: false,
      };
    },
    created() {
      // 현재 쿠키
      window.addEventListener('scroll', this.scrollFunction);
      this.userToken = this.$cookie.get('userToken');
      if (this.userToken != null) {
        this.username = this.$cookie.get('userName');
        this.userRating = this.$cookie.get('userRating');
        this.loginState = true;
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollFunction);
    },
    methods: {
      scrollFunction() {
        this.scrolled = window.scrollY;
        console.log(this.scrolled);
        if (this.scrolled > 200) {
          this.scrollMenu = true;
        } else {
          this.scrollMenu = false;
        }
      },
      problemLoginCheck() {
        if (this.$cookie.get('userToken') == null) {
          this.$swal(
            '입장 불가',
            '로그인을 하셨나요?',
            'error',
          );
        } else {
          this.$router.go({
            name: 'problems',
          });
        }
      },
      rankLoginCheck() {
        if (this.$cookie.get('userToken') == null) {
          this.$swal(
            '입장 불가',
            '로그인을 하셨나요?',
            'error',
          );
        } else {
          this.$router.go({
            name: 'rank',
          });
        }
      },
      cookieDel() {
        // 쿠키 삭제
        this.$cookie.delete('userToken');
        this.$cookie.delete('userRating');
        this.$cookie.delete('userName');
      },
      isNumber(number) {
        const evt = (number) || window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
          return false;
        }
        return true;
      },
      logout() {
        this.loginState = false;
        this.$swal({
          title: '로그아웃합니다',
          text: '이 상자는 2초후에 사라집니다',
          timer: 2000,
        },
        );
        this.cookieDel();
      },
      // 폼 모달
      openModal() {
        $('.ui.modal').modal({
          blurring: true,
        }).modal('show');
      },
      closeModal() {
        $('.ui.modal').modal('hide');
      },
      submit() {
        if (this.signState === true) {
          // true = 로그인 , false = 회원가입
          this.$http.post('api/users/signin', {
            userid: this.userid,
            password: this.password,
          })
          .then((resSign) => {
            this.userToken = resSign.data.token;
            // 헤더 토큰 등록
            this.$http.defaults.headers.common.Authorization = this.userToken;
            // 토큰 테스트
            this.$http.get('api/users/my-info')
              // 로그인 성공
              .then((resInfo) => {
                if (resInfo.status === 200) {
                  this.loginState = true;
                  this.username = resInfo.data.user.username;
                  this.closeModal();
                  this.loginState = true;
                  this.userRating = resInfo.data.user.rating;
                  // Cookie : 이름 , 내용 , 만료기간 , 도메인
                  this.$cookie.set('userName', this.username, 1);
                  this.$cookie.set('userToken', this.userToken, 1);
                  this.$cookie.set('userRating', this.userRating, 1);
                  // 쿠키 값 출력
//                  alert(' 안녕하세요 ');
                  this.$swal(
                  	'로그인 성공',
                    '안녕하세요!',
                    'success',
                  );
                }
              })
              // 토큰인증 실패

              .catch((err) => {
//                alert(`token error ${err}`);
                this.$swal(`token error ${err}`);
              });
          })

          .catch((err) => {
            alert(err);
            if (err.response.data.message === 'account false') {
//              alert('승인중입니다');
              this.$swal(
              	'로그인 실패',
                '관리자의 승인을 기다려주세요',
                'error');
            }
          });
        } else {
          // 회원가입
          this.$http.post('api/users/signup', {
            username: this.username,
            userid: this.userid,
            password: this.password,
            studentcode: this.studentcode,
          })
          .then((res) => {
            this.closeModal();
            const result = res.data.result;
            const username = res.data.username;
//            alert(`${result} ':' ${username}`);
            this.$swal(`${result} ':' ${username}`);
          })
          .catch((error) => {
            alert(error);
          });
        }
      },
    },
  };
</script>


<style src="./assets/css/app.css" scoped></style>

<style scoped>
  .sigoPage-enter-active {
    transition: all .3s ease;
  }
  .sigoPage-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .sigoPage-enter, .sigoPage-leave-to
    /* .slide-fade-leave-active for <2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }


</style>
