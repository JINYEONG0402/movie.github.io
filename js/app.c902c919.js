(function(){"use strict";var e={9101:function(e,t,i){var o=i(5130),a=i(6768);function l(e,t,i,o,l,s){const n=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(n)}var s={name:"App",mounted(){window.Kakao.isInitialized()||window.Kakao.init({NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_KAKAO_API_KEY)}},n=i(1241);const r=(0,n.A)(s,[["render",l]]);var c=r,u=i(1387);const v={class:"login-container"};function d(e,t,i,o,l,s){return(0,a.uX)(),(0,a.CE)("div",v,[t[1]||(t[1]=(0,a.Lk)("h2",null,"로그인",-1)),(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>o.kakaoLogin&&o.kakaoLogin(...e)),class:"kakao-login-btn"},"카카오로 로그인")])}i(4114);var g=i(144),p={setup(){const e=(0,g.KR)(!1),t=(0,g.KR)(""),i=(0,u.rd)(),o="27d7fae4bb996ac3f5874f779a8f0df8",l=()=>{window.Kakao.isInitialized()||window.Kakao.init(o),window.Kakao.Auth.login({success:e=>{localStorage.setItem("kakao_token",e.access_token),s()},fail:e=>{console.error("카카오 로그인 실패:",e)}})},s=()=>{window.Kakao.isInitialized()||window.Kakao.init(o),window.Kakao.API.request({url:"/v2/user/me",success:i=>{t.value=i.kakao_account.profile.nickname,e.value=!0},fail:e=>{console.error("사용자 정보 요청 실패:",e)}})},n=()=>{window.Kakao.isInitialized()||window.Kakao.init(o),window.Kakao.Auth.getAccessToken()?window.Kakao.Auth.logout((()=>{localStorage.removeItem("kakao_token"),e.value=!1,t.value="",i.push("/")})):(localStorage.removeItem("kakao_token"),e.value=!1,t.value="",i.push("/"))},r=()=>{const i=localStorage.getItem("kakao_token");i&&(localStorage.removeItem("kakao_token"),e.value=!1,t.value="")};return(0,a.sV)((()=>{r()})),{isLoggedIn:e,userNickname:t,kakaoLogin:l,logout:n}}};const k=(0,n.A)(p,[["render",d],["__scopeId","data-v-2e64cfe7"]]);var h=k;const m={id:"app"},w={id:"container"};function _(e,t,i,o,l,s){const n=(0,a.g2)("Header"),r=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.CE)("div",m,[(0,a.bF)(n),(0,a.Lk)("div",w,[(0,a.bF)(r)])])}var f=i(4232);const L={id:"container"},E={class:"header-left"},C={class:"logo"},b={class:"nav-links desktop-nav"},I={class:"header-right"},y={key:0,class:"user-info"},K=["src"],R={class:"profile-nickname"};function A(e,t,i,o,l,s){const n=(0,a.g2)("font-awesome-icon"),r=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",L,[(0,a.Lk)("header",{class:(0,f.C4)(["app-header",{scrolled:o.isScrolled}])},[(0,a.Lk)("div",E,[(0,a.Lk)("div",C,[(0,a.bF)(r,{to:"/"},{default:(0,a.k6)((()=>[(0,a.bF)(n,{icon:"cube",style:{color:"rgba(242, 0, 255, 0.8)"}})])),_:1})]),(0,a.Lk)("nav",b,[(0,a.Lk)("ul",null,[(0,a.Lk)("li",null,[(0,a.bF)(r,{to:"/"},{default:(0,a.k6)((()=>t[2]||(t[2]=[(0,a.eW)("홈")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(r,{to:"/popular"},{default:(0,a.k6)((()=>t[3]||(t[3]=[(0,a.eW)("요즘 핫한")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(r,{to:"/wishlist"},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)("위시 리스트")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(r,{to:"/search"},{default:(0,a.k6)((()=>t[5]||(t[5]=[(0,a.eW)("카테고리")]))),_:1})])])])]),(0,a.Lk)("div",I,[o.isLoggedIn?((0,a.uX)(),(0,a.CE)("div",y,[o.userProfileImage?((0,a.uX)(),(0,a.CE)("img",{key:0,src:o.userProfileImage,alt:"프로필 이미지",class:"profile-image-small"},null,8,K)):(0,a.Q3)("",!0),(0,a.Lk)("span",R,(0,f.v_)(o.userNickname),1),(0,a.Lk)("button",{class:"logout-button",onClick:t[0]||(t[0]=(...e)=>o.confirmLogout&&o.confirmLogout(...e))},"로그아웃")])):((0,a.uX)(),(0,a.CE)("button",{key:1,class:"icon-button",onClick:t[1]||(t[1]=(...e)=>o.kakaoLogin&&o.kakaoLogin(...e))},[(0,a.bF)(n,{icon:"user"})]))])],2)])}i(4603),i(7566),i(8721);var P=i(8950),W=i(2353),S=i(292);P.Yv.add(W.X46,W.br3);var M={name:"AppHeader",components:{FontAwesomeIcon:S.gc},setup(){const e=(0,g.KR)(!1),t=(0,g.KR)(!1),i=(0,g.KR)(""),o=(0,g.KR)(""),l=(0,u.rd)(),s={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_KAKAO_CLIENT_ID,n={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_KAKAO_REDIRECT_URI;s&&n||console.error("카카오 클라이언트 ID 또는 리다이렉트 URI가 설정되지 않았습니다.");const r=()=>{e.value=window.scrollY>50},c=()=>{window.Kakao.isInitialized()||window.Kakao.init(s);const e=`https://kauth.kakao.com/oauth/authorize?client_id=${s}&redirect_uri=${n}&response_type=code&scope=profile_nickname,profile_image,account_email`;console.log("Kakao Auth URL:",e),window.location.href=e},v=async()=>{const e=new URLSearchParams(window.location.search),t=e.get("code");if(t)try{const e=await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${s}&redirect_uri=${n}&code=${t}`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}}),i=await e.json();i.access_token?(localStorage.setItem("kakao_token",i.access_token),d(i.access_token)):console.error("토큰 요청 실패:",i)}catch(i){console.error("토큰 요청 중 오류 발생:",i)}},d=async e=>{try{const a=await fetch("https://kapi.kakao.com/v2/user/me",{method:"GET",headers:{Authorization:`Bearer ${e}`}}),l=await a.json();i.value=l.kakao_account.profile.nickname,o.value=l.kakao_account.profile.profile_image_url,t.value=!0}catch(a){console.error("사용자 정보 요청 실패:",a)}},p=()=>{localStorage.removeItem("kakao_token"),i.value="",o.value="",t.value=!1,l.push("/")},k=()=>{confirm("정말 로그아웃하시겠습니까?")&&p()},h=()=>{const e=localStorage.getItem("kakao_token");e&&d(e)};return(0,a.sV)((()=>{window.addEventListener("scroll",r),v(),h()})),(0,a.hi)((()=>{window.removeEventListener("scroll",r)})),{isScrolled:e,isLoggedIn:t,userNickname:i,userProfileImage:o,kakaoLogin:c,confirmLogout:k}}};const X=(0,n.A)(M,[["render",A],["__scopeId","data-v-258c1825"]]);var U=X,$=(0,a.pM)({name:"Home",components:{Header:U}});const T=(0,n.A)($,[["render",_],["__scopeId","data-v-a10561e8"]]);var V=T;const O={class:"home"},F={class:"movie-section"},B={class:"movie-row"},N=["onClick"],D=["src","alt"],j={class:"movie-section"},z={class:"movie-row"},x=["onClick"],G=["src","alt"],Q={class:"movie-section"},Y={class:"movie-row"},H=["onClick"],q=["src","alt"];function J(e,t,i,o,l,s){const n=(0,a.g2)("Banner");return(0,a.uX)(),(0,a.CE)("div",O,[(0,a.bF)(n,{movie:o.featuredMovie},null,8,["movie"]),(0,a.Lk)("section",F,[t[0]||(t[0]=(0,a.Lk)("h2",null,"인기영화",-1)),(0,a.Lk)("div",B,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.popularMovies,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onClick:t=>o.handleWishlistClick(e)},[(0,a.Lk)("img",{src:`https://image.tmdb.org/t/p/w500${e.poster_path}`,alt:e.title},null,8,D),(0,a.Lk)("p",null,(0,f.v_)(e.title),1),(0,a.Lk)("span",{class:(0,f.C4)(["wishlist-indicator",{active:o.isInWishlist(e.id)}])}," ♥ ",2)],8,N)))),128))])]),(0,a.Lk)("section",j,[t[1]||(t[1]=(0,a.Lk)("h2",null,"신작",-1)),(0,a.Lk)("div",z,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.newReleases,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onClick:t=>o.handleWishlistClick(e)},[(0,a.Lk)("img",{src:`https://image.tmdb.org/t/p/w500${e.poster_path}`,alt:e.title},null,8,G),(0,a.Lk)("p",null,(0,f.v_)(e.title),1),(0,a.Lk)("span",{class:(0,f.C4)(["wishlist-indicator",{active:o.isInWishlist(e.id)}])}," ♥ ",2)],8,x)))),128))])]),(0,a.Lk)("section",Q,[t[2]||(t[2]=(0,a.Lk)("h2",null,"액션영화",-1)),(0,a.Lk)("div",Y,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.actionMovies,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onClick:t=>o.handleWishlistClick(e)},[(0,a.Lk)("img",{src:`https://image.tmdb.org/t/p/w500${e.poster_path}`,alt:e.title},null,8,q),(0,a.Lk)("p",null,(0,f.v_)(e.title),1),(0,a.Lk)("span",{class:(0,f.C4)(["wishlist-indicator",{active:o.isInWishlist(e.id)}])}," ♥ ",2)],8,H)))),128))])])])}i(1454);const Z={class:"banner-content"},ee={key:0,class:"movie-details"},te={class:"details-content"},ie={class:"details-grid"},oe={class:"poster"},ae=["src","alt"],le={class:"info"},se={class:"details-info"},ne={class:"overview"},re={key:0,class:"trailer-section"},ce=["src"],ue={key:1};function ve(e,t,i,o,l,s){return i.movie?((0,a.uX)(),(0,a.CE)("div",{key:0,class:"banner",style:(0,f.Tr)({backgroundImage:`url(${s.backdropUrl})`})},[(0,a.Lk)("div",Z,[(0,a.Lk)("h1",null,(0,f.v_)(i.movie.title),1),(0,a.Lk)("p",null,(0,f.v_)(i.movie.overview),1),t[3]||(t[3]=(0,a.Lk)("button",{class:"play-btn title-btn"},"재생",-1)),(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.toggleDetails&&s.toggleDetails(...e)),class:"info-btn title-btn"}," 상세 정보 ")]),l.showDetails?((0,a.uX)(),(0,a.CE)("div",ee,[(0,a.Lk)("div",te,[(0,a.Lk)("button",{class:"close-btn",onClick:t[1]||(t[1]=(...e)=>s.toggleDetails&&s.toggleDetails(...e))},"×"),(0,a.Lk)("div",ie,[(0,a.Lk)("div",oe,[(0,a.Lk)("img",{src:s.posterUrl,alt:i.movie.title,onError:t[2]||(t[2]=(...e)=>s.handleImageError&&s.handleImageError(...e))},null,40,ae)]),(0,a.Lk)("div",le,[(0,a.Lk)("h2",null,(0,f.v_)(i.movie.title),1),(0,a.Lk)("div",se,[(0,a.Lk)("p",null,[t[4]||(t[4]=(0,a.Lk)("strong",null,"개봉일:",-1)),(0,a.eW)(" "+(0,f.v_)(i.movie.release_date),1)]),(0,a.Lk)("p",null,[t[5]||(t[5]=(0,a.Lk)("strong",null,"평점:",-1)),(0,a.eW)(" "+(0,f.v_)(i.movie.vote_average)+"/10",1)]),(0,a.Lk)("p",null,[t[6]||(t[6]=(0,a.Lk)("strong",null,"장르:",-1)),(0,a.eW)(" "+(0,f.v_)(i.movie.genres?.map((e=>e.name)).join(", ")),1)]),(0,a.Lk)("p",ne,[t[7]||(t[7]=(0,a.Lk)("strong",null,"줄거리:",-1)),(0,a.eW)(" "+(0,f.v_)(i.movie.overview),1)])])])]),l.trailerUrl?((0,a.uX)(),(0,a.CE)("div",re,[t[8]||(t[8]=(0,a.Lk)("h3",null,"예고편",-1)),(0,a.Lk)("iframe",{src:l.trailerUrl,frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,8,ce)])):(0,a.Q3)("",!0)])])):(0,a.Q3)("",!0)],4)):((0,a.uX)(),(0,a.CE)("div",ue,t[9]||(t[9]=[(0,a.Lk)("p",null,"Loading banner...",-1)])))}i(8992),i(2577);var de={name:"Banner",props:{movie:{type:Object,required:!1,default:()=>null}},data(){return{showDetails:!1,trailerUrl:null}},computed:{backdropUrl(){return this.movie?.backdrop_path?`https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`:""},posterUrl(){return this.movie?.poster_path?`https://image.tmdb.org/t/p/w500${this.movie.poster_path}`:""}},watch:{showDetails(e){e&&this.movie&&this.fetchTrailer()}},methods:{toggleDetails(){this.showDetails=!this.showDetails},handleImageError(e){e.target.src="/placeholder-image.jpg"},async fetchTrailer(){try{const e=await fetch(`https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=fb2191b2c2e7923b7b79f8e3fa925043`),t=await e.json(),i=t.results.find((e=>"Trailer"===e.type&&"YouTube"===e.site));i&&(this.trailerUrl=`https://www.youtube.com/embed/${i.key}`)}catch(e){console.error("Failed to fetch trailer:",e)}}}};const ge=(0,n.A)(de,[["render",ve],["__scopeId","data-v-4df74549"]]);var pe=ge,ke=i(1114),he=i(4373);class me{constructor(){(0,ke.A)(this,"API_KEY",{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_API_KEY),(0,ke.A)(this,"BASE_URL",{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_BASE_URL)}async fetchFeaturedMovie(){try{const e=await he.A.get(`${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=ko-KR`);return e.data.results[0]}catch(e){throw console.error("Error fetching featured movie:",e),e}}getURL4PopularMovies(e=1){return`${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=ko-KR&page=${e}`}getURL4ReleaseMovies(e=2){return`${this.BASE_URL}/movie/now_playing?api_key=${this.API_KEY}&language=ko-KR&page=${e}`}getURL4GenreMovies(e,t=1){return`${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&with_genres=${e}&language=ko-KR&page=${t}`}}const we=new me;i(4520),i(7550);class _e{constructor(){(0,ke.A)(this,"wishlist",void 0),this.wishlist=(0,g.KR)(this.loadWishlist())}loadWishlist(){const e=localStorage.getItem("Kakao-Token");if(!e)return console.warn("로그인이 필요합니다."),[];const t=localStorage.getItem(`movieWishlist_${e}`);return t?JSON.parse(t):[]}saveWishlist(){const e=localStorage.getItem("Kakao-Token");e?localStorage.setItem(`movieWishlist_${e}`,JSON.stringify(this.wishlist.value)):console.warn("로그인이 필요합니다. 위시리스트를 저장할 수 없습니다.")}toggleWishlist(e){const t=this.wishlist.value.findIndex((t=>t.id===e.id));-1===t?this.wishlist.value.push({id:e.id,title:e.title,poster_path:e.poster_path||""}):this.wishlist.value=this.wishlist.value.filter((t=>t.id!==e.id)),this.saveWishlist()}isInWishlist(e){return this.wishlist.value.some((t=>t.id===e))}getCurrentWishlist(){return this.wishlist.value}get wishlist$(){return(0,a.EW)((()=>this.wishlist.value))}}const fe=new _e;var Le={name:"HomeMain",components:{Banner:pe},setup(){const e=(0,g.KR)({title:"",overview:"",backdrop_path:""}),t=(0,g.KR)([]),i=(0,g.KR)([]),o=(0,g.KR)([]),l=async()=>{try{const a=await fetch(we.getURL4PopularMovies());t.value=(await a.json()).results;const l=await fetch(we.getURL4ReleaseMovies());i.value=(await l.json()).results;const s=await fetch(we.getURL4GenreMovies("28"));if(o.value=(await s.json()).results,t.value.length>=5){const i=t.value[4];e.value={title:i.title,overview:i.overview,backdrop_path:i.backdrop_path}}}catch(a){console.error("Failed to load movies:",a)}},s=e=>{const t=localStorage.getItem("kakao_token");t?fe.toggleWishlist(e):alert("위시리스트를 사용하려면 로그인이 필요합니다.")},n=e=>fe.isInWishlist(e);return(0,a.sV)((()=>{l()})),{featuredMovie:e,popularMovies:t,newReleases:i,actionMovies:o,handleWishlistClick:s,isInWishlist:n}}};const Ee=(0,n.A)(Le,[["render",J],["__scopeId","data-v-784b2fc8"]]);var Ce=Ee;const be={class:"popular-container"},Ie={class:"view-toggle"};function ye(e,t,i,o,l,s){const n=(0,a.g2)("font-awesome-icon"),r=(0,a.g2)("MovieGrid"),c=(0,a.g2)("MovieInfiniteScroll");return(0,a.uX)(),(0,a.CE)("div",be,[(0,a.Lk)("div",Ie,[(0,a.Lk)("button",{onClick:t[0]||(t[0]=t=>e.setView("grid")),class:(0,f.C4)({active:"grid"===e.currentView})},[(0,a.bF)(n,{icon:e.faTh},null,8,["icon"])],2),(0,a.Lk)("button",{onClick:t[1]||(t[1]=t=>e.setView("list")),class:(0,f.C4)({active:"list"===e.currentView})},[(0,a.bF)(n,{icon:e.faBars},null,8,["icon"])],2)]),"grid"===e.currentView?((0,a.uX)(),(0,a.Wv)(r,{key:0,title:"인기 영화","fetch-url":e.fetchURL},null,8,["fetch-url"])):(0,a.Q3)("",!0),"list"===e.currentView?((0,a.uX)(),(0,a.Wv)(c,{key:1,"api-key":e.apiKey,"genre-code":e.genreCode,"sorting-order":e.sortingOrder,"vote-average":e.voteAverage},null,8,["api-key","genre-code","sorting-order","vote-average"])):(0,a.Q3)("",!0)])}const Ke={class:"movie-grid",ref:"gridContainer"},Re={key:0,class:"loading-indicator"},Ae=["onClick"],Pe=["src","alt"],We={class:"movie-title"},Se={key:0,class:"wishlist-indicator"},Me={key:2,class:"pagination"},Xe=["disabled"],Ue=["disabled"];function $e(e,t,i,o,l,s){return(0,a.uX)(),(0,a.CE)("div",Ke,[e.isLoading?((0,a.uX)(),(0,a.CE)("div",Re,"Loading...")):((0,a.uX)(),(0,a.CE)("div",{key:1,class:(0,f.C4)(["grid-container",e.currentView])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.visibleMovieGroups,((t,i)=>((0,a.uX)(),(0,a.CE)("div",{key:i,class:(0,f.C4)(["movie-row",{full:t.length===e.rowSize}])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(t,(t=>((0,a.uX)(),(0,a.CE)("div",{key:t.id,class:"movie-card",onClick:i=>e.toggleWishlist(t)},[(0,a.Lk)("img",{src:e.getImageUrl(t.poster_path),alt:t.title||"No Title Available",loading:"lazy"},null,8,Pe),(0,a.Lk)("div",We,(0,f.v_)(t.title),1),e.isInWishlist(t.id)?((0,a.uX)(),(0,a.CE)("div",Se,"👍")):(0,a.Q3)("",!0)],8,Ae)))),128))],2)))),128))],2)),e.totalPages>1?((0,a.uX)(),(0,a.CE)("div",Me,[(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...t)=>e.prevPage&&e.prevPage(...t)),disabled:1===e.currentPage},"< 이전",8,Xe),(0,a.Lk)("span",null,(0,f.v_)(e.currentPage)+" / "+(0,f.v_)(e.totalPages),1),(0,a.Lk)("button",{onClick:t[1]||(t[1]=(...t)=>e.nextPage&&e.nextPage(...t)),disabled:e.currentPage===e.totalPages}," 다음 > ",8,Ue)])):(0,a.Q3)("",!0)],512)}i(8872);var Te=(0,a.pM)({name:"MovieGrid",props:{fetchUrl:{type:String,required:!0}},setup(e){const t=(0,g.KR)([]),i=(0,g.KR)(!0),o=(0,g.KR)(1),l=(0,g.KR)(3),s=(0,g.KR)(20),n=async()=>{try{const i=await he.A.get(e.fetchUrl);t.value=i.data.results||[]}catch(i){console.error("Error fetching movies:",i),t.value=[]}},r=(0,a.EW)((()=>{if(!t.value||0===t.value.length)return[];const e=(o.value-1)*s.value,i=e+s.value,a=t.value.slice(e,i);return a.reduce(((e,t,i)=>{const o=Math.floor(i/l.value);return e[o]||(e[o]=[]),e[o].push(t),e}),[])})),c=(0,a.EW)((()=>Math.ceil(t.value.length/s.value))),u=e=>`https://image.tmdb.org/t/p/w300${e}`,v=e=>{},d=e=>!1,p=()=>{o.value<c.value&&o.value++},k=()=>{o.value>1&&o.value--};return(0,a.sV)((async()=>{await n(),i.value=!1})),{movies:t,isLoading:i,currentPage:o,rowSize:l,moviesPerPage:s,getImageUrl:u,visibleMovieGroups:r,totalPages:c,nextPage:p,prevPage:k,toggleWishlist:v,isInWishlist:d}}});const Ve=(0,n.A)(Te,[["render",$e],["__scopeId","data-v-fea8ef92"]]);var Oe=Ve;const Fe={class:"movie-grid",ref:"gridContainer"},Be=["onMouseup"],Ne=["src","alt"],De={class:"movie-title"},je={ref:"loadingTrigger",class:"loading-trigger"},ze={key:0,class:"loading-indicator"};function xe(e,t,i,o,l,s){return(0,a.uX)(),(0,a.CE)("div",Fe,[(0,a.Lk)("div",{class:(0,f.C4)(["grid-container",{list:"list"===o.currentView}])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.visibleMovieGroups,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:(0,f.C4)(["movie-row",{full:e.length===o.rowSize}])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onMouseup:t=>o.toggleWishlist(e)},[(0,a.Lk)("img",{src:o.getImageUrl(e.poster_path),alt:e.title||"No Title Available",loading:"lazy"},null,8,Ne),(0,a.Lk)("div",De,(0,f.v_)(e.title),1)],40,Be)))),128))],2)))),128))],2),(0,a.Lk)("div",je,[o.isLoading?((0,a.uX)(),(0,a.CE)("div",ze,t[1]||(t[1]=[(0,a.Lk)("div",{class:"spinner"},null,-1),(0,a.Lk)("span",null,"Loading...",-1)]))):(0,a.Q3)("",!0)],512),o.showTopButton?((0,a.uX)(),(0,a.CE)("button",{key:0,onClick:t[0]||(t[0]=(...e)=>o.scrollToTopAndReset&&o.scrollToTopAndReset(...e)),class:"top-button","aria-label":"맨 위로 이동"}," Top ")):(0,a.Q3)("",!0)],512)}var Ge={name:"MovieInfiniteScroll",props:{apiKey:{type:String,required:!0},genreCode:{type:String,default:"0"},sortingOrder:{type:String,default:"all"},voteAverage:{type:Number,default:-1}},setup(e){const t=(0,g.KR)([]),i=(0,g.KR)(1),o=(0,g.KR)(4),l=(0,g.KR)(!1),s=(0,g.KR)(!0),n=(0,g.KR)("grid"),r=(0,g.KR)(!1),c=(0,g.KR)(null),u=(0,g.KR)([]);let v;const d=async()=>{if(!l.value&&s.value){l.value=!0;try{const o="0"===e.genreCode?"https://api.themoviedb.org/3/movie/popular":"https://api.themoviedb.org/3/discover/movie",a={api_key:e.apiKey,language:"ko-KR",page:i.value};"0"!==e.genreCode&&(a.with_genres=e.genreCode),e.voteAverage>0&&(a["vote_average.gte"]=e.voteAverage,a["vote_average.lte"]=e.voteAverage+1),"all"!==e.sortingOrder&&(a.with_original_language=e.sortingOrder);const l=await he.A.get(o,{params:a}),n=l.data.results;n.length>0?(t.value=[...t.value,...n],i.value++):s.value=!1}catch(o){console.error("Error fetching movies:",o)}finally{l.value=!1}}},p=(0,a.EW)((()=>k(t.value,o.value))),k=(e,t)=>{const i=[];for(let o=0;o<e.length;o+=t)i.push(e.slice(o,o+t));return i},h=e=>e?`https://image.tmdb.org/t/p/w300${e}`:"/placeholder-image.jpg",m=e=>{u.value.includes(e.id)?u.value=u.value.filter((t=>t!==e.id)):u.value.push(e.id),console.log("Current Wishlist:",u.value)},w=e=>u.value.includes(e),_=()=>{const e=c.value;if(e){const t=e.scrollTop;r.value=t>300}},f=()=>{const e=c.value;e&&e.scrollTo({top:0,behavior:"smooth"}),t.value=[],i.value=1,s.value=!0,d()},L=()=>{v=new IntersectionObserver((e=>{e[0].isIntersecting&&s.value&&!l.value&&d()}),{root:c.value,rootMargin:"100px",threshold:.1}),c.value&&v.observe(c.value.querySelector(".loading-trigger"))};return(0,a.sV)((()=>{d(),L(),c.value&&c.value.addEventListener("scroll",_)})),(0,a.hi)((()=>{v&&v.disconnect(),c.value&&c.value.removeEventListener("scroll",_)})),{gridContainer:c,visibleMovieGroups:p,fetchMovies:d,getImageUrl:h,toggleWishlist:m,isInWishlist:w,scrollToTopAndReset:f,handleScroll:_,isLoading:l,showTopButton:r,rowSize:o,currentView:n}}};const Qe=(0,n.A)(Ge,[["render",xe],["__scopeId","data-v-16d97778"]]);var Ye=Qe,He=(0,a.pM)({name:"Popular",components:{FontAwesomeIcon:S.gc,MovieGrid:Oe,MovieInfiniteScroll:Ye},setup(){const e={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_API_KEY,t={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_BASE_URL,i=(0,g.KR)("grid"),o=(0,g.KR)("28"),l=(0,g.KR)("all"),s=(0,g.KR)(-1),n=(0,a.EW)((()=>`${t}/movie/popular?api_key=${e}&language=ko-KR&page=1`)),r=e=>{i.value=e};return{faTh:W.UTC,faBars:W.ckx,apiKey:e,genreCode:o,sortingOrder:l,voteAverage:s,currentView:i,fetchURL:n,setView:r}}});const qe=(0,n.A)(He,[["render",ye],["__scopeId","data-v-f0ba87e2"]]);var Je=qe;const Ze={class:"container-search"},et={class:"container-search-bar"},tt=["value"],it=["value"],ot=["value"],at={class:"content-search"},lt={class:"movie-list"},st=["onClick"],nt=["src","alt"],rt={key:0,class:"loading-spinner"};function ct(e,t,i,l,s,n){return(0,a.uX)(),(0,a.CE)("div",Ze,[(0,a.Lk)("div",et,[(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>l.selectedGenre=e),onChange:t[1]||(t[1]=(...e)=>l.updateMovies&&l.updateMovies(...e))},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.genreCode,((e,t)=>((0,a.uX)(),(0,a.CE)("option",{key:e,value:e},(0,f.v_)(t),9,tt)))),128))],544),[[o.u1,l.selectedGenre]]),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t[2]||(t[2]=e=>l.selectedSort=e),onChange:t[3]||(t[3]=(...e)=>l.updateMovies&&l.updateMovies(...e))},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.sortingCode,((e,t)=>((0,a.uX)(),(0,a.CE)("option",{key:e,value:e},(0,f.v_)(t),9,it)))),128))],544),[[o.u1,l.selectedSort]]),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t[4]||(t[4]=e=>l.selectedAge=e),onChange:t[5]||(t[5]=(...e)=>l.updateMovies&&l.updateMovies(...e))},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.ageCode,((e,t)=>((0,a.uX)(),(0,a.CE)("option",{key:e,value:e},(0,f.v_)(t),9,ot)))),128))],544),[[o.u1,l.selectedAge]]),(0,a.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>l.resetFilters&&l.resetFilters(...e)),class:"reset-button"},"초기화")]),(0,a.Lk)("div",at,[(0,a.Lk)("h2",null,(0,f.v_)(l.selectedGenreName)+" 영화",1),(0,a.Lk)("div",lt,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.movies,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onClick:t=>l.isLoggedIn?l.handleWishlistClick(e):null},[e.poster_path?((0,a.uX)(),(0,a.CE)("img",{key:0,src:`https://image.tmdb.org/t/p/w500${e.poster_path}`,alt:e.title},null,8,nt)):(0,a.Q3)("",!0),(0,a.Lk)("p",null,(0,f.v_)(e.title),1),l.isLoggedIn?((0,a.uX)(),(0,a.CE)("span",{key:1,class:(0,f.C4)(["wishlist-indicator",{active:l.isInWishlist(e.id)}])}," ♥ ",2)):(0,a.Q3)("",!0)],8,st)))),128)),l.isLoading?((0,a.uX)(),(0,a.CE)("div",rt,"로딩 중...")):(0,a.Q3)("",!0)])])])}var ut={name:"Search",setup(){const e={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_API_KEY,t={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_TMDB_BASE_URL,i=(0,g.KR)(0),o=(0,g.KR)("all"),l=(0,g.KR)(-1),s=(0,g.KR)([]),n=(0,g.KR)(1),r=(0,g.KR)(1),c=(0,g.KR)(!1),u=(0,g.KR)(!!localStorage.getItem("kakao_token")),v={"장르 (전체)":0,"액 션":28,"판타지, 모험":12,"코 미디":35,"공 포":80,"가 족":10751},d={"언 어":"all",En:"en",Ko:"ko"},p={"평 점":-1,"9~10":9,"8~9":8,"7~8":7,"6~7":6,"5~6":5,"4~5":4,"4점 이하":-2},k=(0,a.EW)((()=>Object.keys(v).find((e=>v[e]===parseInt(i.value)))||"전체")),h=async(a=1)=>{if(c.value||a>r.value)return;c.value=!0;const u=0!==i.value?`&with_genres=${i.value}`:"",v="all"!==o.value?`&with_original_language=${o.value}`:"",d=l.value>=0?`&vote_average.gte=${l.value}`:"",g=`${t}/discover/movie?api_key=${e}&language=ko-KR&page=${a}${u}${v}${d}`;try{const e=await fetch(g),t=await e.json();s.value=[...s.value,...t.results],r.value=t.total_pages,n.value=a}catch(p){console.error("Failed to fetch movies:",p)}finally{c.value=!1}},m=()=>{h(n.value+1)},w=()=>{const e=document.documentElement.scrollHeight-window.innerHeight,t=window.scrollY;t>=e-200&&m()},_=()=>{i.value=0,o.value="all",l.value=-1,s.value=[],n.value=1,h(1)},f=()=>{s.value=[],n.value=1,h(1)},L=e=>{const t=localStorage.getItem("kakao_token");t?fe.toggleWishlist(e):alert("위시리스트를 사용하려면 로그인이 필요합니다.")},E=e=>u.value&&fe.isInWishlist(e);return(0,a.sV)((()=>{h(),window.addEventListener("scroll",w)})),(0,a.hi)((()=>{window.removeEventListener("scroll",w)})),{selectedGenre:i,selectedSort:o,selectedAge:l,selectedGenreName:k,movies:s,genreCode:v,sortingCode:d,ageCode:p,resetFilters:_,updateMovies:f,handleWishlistClick:L,isInWishlist:E,isLoading:c,isLoggedIn:u}}};const vt=(0,n.A)(ut,[["render",ct],["__scopeId","data-v-69274896"]]);var dt=vt;function gt(e,t,i,o,l,s){const n=(0,a.g2)("MovieWishlist");return(0,a.uX)(),(0,a.Wv)(n)}const pt={class:"movie-grid",ref:"gridContainer"},kt={key:0,class:"empty-wishlist"},ht={key:1},mt=["onClick"],wt=["src","alt"],_t={class:"movie-title"},ft={key:0,class:"empty-wishlist"},Lt={key:1,class:"pagination"},Et=["disabled"],Ct=["disabled"];function bt(e,t,i,o,l,s){return(0,a.uX)(),(0,a.CE)("div",pt,[o.isLoggedIn?((0,a.uX)(),(0,a.CE)("div",ht,[(0,a.Lk)("div",{class:(0,f.C4)(["grid-container",o.currentView])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.visibleWishlistMovies,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:(0,f.C4)(["movie-row",{full:e.length===o.rowSize}])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card",onClick:t=>o.toggleWishlist(e)},[(0,a.Lk)("img",{src:o.getImageUrl(e.poster_path),alt:e.title},null,8,wt),(0,a.Lk)("div",_t,(0,f.v_)(e.title),1),(0,a.Lk)("div",{class:(0,f.C4)(["wishlist-indicator",{active:o.isMovieInWishlist(e.id)}])}," ♥ ",2)],8,mt)))),128))],2)))),128))],2),0===o.wishlistMovies.length?((0,a.uX)(),(0,a.CE)("div",ft," 위시리스트가 비어 있습니다. ")):(0,a.Q3)("",!0),o.totalPages>1?((0,a.uX)(),(0,a.CE)("div",Lt,[(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>o.prevPage&&o.prevPage(...e)),disabled:1===o.currentPage}," < 이전 ",8,Et),(0,a.Lk)("span",null,(0,f.v_)(o.currentPage)+" / "+(0,f.v_)(o.totalPages),1),(0,a.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>o.nextPage&&o.nextPage(...e)),disabled:o.currentPage===o.totalPages}," 다음 > ",8,Ct)])):(0,a.Q3)("",!0)])):((0,a.uX)(),(0,a.CE)("div",kt," 로그인이 필요한 서비스입니다. "))],512)}var It={name:"MovieWishlist",setup(){const e=(0,g.KR)(null),t=(0,g.KR)([]),i=(0,g.KR)([]),o=(0,g.KR)("grid"),l=(0,g.KR)(1),s=(0,g.KR)(4),n=(0,g.KR)(20),r=(0,g.KR)(window.innerWidth<=768),c=(0,a.EW)((()=>!!localStorage.getItem("kakao_token"))),u=()=>{c.value?(t.value=fe.getCurrentWishlist(),p()):t.value=[]},v=e=>e?`https://image.tmdb.org/t/p/w300${e}`:"/placeholder-image.jpg",d=()=>{if(!e.value)return;const t=e.value,i=t.offsetWidth,o=window.innerHeight-t.offsetTop,a=r.value?90:220,l=r.value?150:330,c=r.value?10:15,u=-10;s.value=Math.floor(i/(a+c));const v=Math.floor(o/(l+u));n.value=s.value*v,p()},p=()=>{const e=(l.value-1)*n.value,o=e+n.value,a=t.value.slice(e,o);i.value=a.reduce(((e,t,i)=>{const o=Math.floor(i/s.value);return e[o]||(e[o]=[]),e[o].push(t),e}),[])},k=(0,a.EW)((()=>Math.ceil(t.value.length/n.value))),h=()=>{l.value<k.value&&(l.value++,p())},m=()=>{l.value>1&&(l.value--,p())},w=e=>{c.value?(fe.toggleWishlist(e),u()):alert("위시리스트를 사용하려면 로그인이 필요합니다.")},_=e=>fe.isInWishlist(e),f=()=>{r.value=window.innerWidth<=768,d()};return(0,a.wB)((()=>fe.wishlist$.value),(()=>{u()})),(0,a.sV)((()=>{u(),d(),window.addEventListener("resize",f)})),(0,a.hi)((()=>{window.removeEventListener("resize",f)})),{gridContainer:e,wishlistMovies:t,visibleWishlistMovies:i,currentView:o,currentPage:l,rowSize:s,moviesPerPage:n,totalPages:k,isMobile:r,isLoggedIn:c,getImageUrl:v,nextPage:h,prevPage:m,toggleWishlist:w,isMovieInWishlist:_}}};const yt=(0,n.A)(It,[["render",bt],["__scopeId","data-v-72367227"]]);var Kt=yt,Rt={name:"HomeWishlist",components:{MovieWishlist:Kt}};const At=(0,n.A)(Rt,[["render",gt]]);var Pt=At;const Wt=[{path:"/",component:V,children:[{path:"",name:"HomeMain",component:Ce},{path:"wishlist",name:"HomeWish",component:Pt},{path:"popular",name:"HomePopular",component:Je},{path:"/Search",component:dt}]},{path:"/signIn",name:"SignIn",component:h},{path:"/:catchAll(.*)",redirect:"/"}],St=(0,u.aE)({history:(0,u.LA)(),routes:Wt});var Mt=St,Xt=i(782);class Ut{static isLoggedIn(){return!!localStorage.getItem("Kakao-Token")}static getToken(){return localStorage.getItem("Kakao-Token")}static logout(){localStorage.removeItem("Kakao-Token")}}var $t=(0,Xt.y$)({state:{isLoggedIn:Ut.isLoggedIn(),userNickname:"",userProfileImage:"",userEmail:""},mutations:{login(e,t){e.isLoggedIn=!0,e.userNickname=t.nickname,e.userProfileImage=t.profileImage,e.userEmail=t.email},logout(e){e.isLoggedIn=!1,e.userNickname="",e.userProfileImage="",e.userEmail=""}},actions:{setLogin({commit:e},t){e("login",t)},setLogout({commit:e}){Ut.logout(),e("logout")}}}),Tt=i(5847);const Vt=(0,o.Ef)(c);window.Kakao.isInitialized()||window.Kakao.init("27d7fae4bb996ac3f5874f779a8f0df8"),Vt.use(Tt.A,{preLoad:1.3,error:"/default-image.jpg",loading:"/loading-spinner.gif",attempt:1}),Vt.use($t).use(Mt).mount("#app")}},t={};function i(o){var a=t[o];if(void 0!==a)return a.exports;var l=t[o]={exports:{}};return e[o].call(l.exports,l,l.exports,i),l.exports}i.m=e,function(){var e=[];i.O=function(t,o,a,l){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],l=e[u][2];for(var n=!0,r=0;r<o.length;r++)(!1&l||s>=l)&&Object.keys(i.O).every((function(e){return i.O[e](o[r])}))?o.splice(r--,1):(n=!1,l<s&&(s=l));if(n){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[o,a,l]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,l,s=o[0],n=o[1],r=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(r)var u=r(i)}for(t&&t(o);c<s.length;c++)l=s[c],i.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return i.O(u)},o=self["webpackChunkmovie"]=self["webpackChunkmovie"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=i.O(void 0,[504],(function(){return i(9101)}));o=i.O(o)})();
//# sourceMappingURL=app.c902c919.js.map