// 아이템 ID 정보 가져옴 (없으면 이전 페이지로)
const itemId = location.href.split('?')[1]
// 유저 ID 정보 가져옴 (비로그인은 null)
const UserId = localStorage.getItem('payload')


// 아이템 사진 슬라이드
$(document).ready(function () {
    $('.slider').bxSlider()
});


// 아이템, 리뷰 데이터 레이아웃 생성 & 입력
async function getDetailView() {
    
    // API 기능 호출
    let data = await DetailViewGetApi()

    // 아이템 섹션
    // 아이템 사진
    const slider = document.getElementsByClassName('slider')[0]
    let sliderLi = document.createElement('li')
    slider.append(sliderLi)
    let sliderPicture = document.createElement('img')
    sliderPicture.setAttribute('src', 'https://t1.daumcdn.net/cfile/tistory/998CCA4A5D1EF94112')
    sliderLi.append(sliderPicture)
    

    // 포스트 유저 프로필이미지
    const postUserImage = document.getElementById('post-user-image')
    postUserImage.setAttribute('src', data.user.image)

    // 포스트 유저 닉네임
    const postNickname = document.getElementById('post-nickname')
    postNickname.innerText = data.user.nickname

    // 포스트 유저 주소
    const address = document.getElementById('address')
    address.innerText = data.user.address

    // 포스트 유저 스코어
    const score = document.getElementsByClassName('user-container-score')
    
    if (data.user.score == null) {
        score[0].innerText = '유저점수 없음'
    }
    else {
        score[0].innerText = data.user.score
    }

    // 대여 상태
    const status = document.getElementById('status')
    status.innerText = data.status
    if (data.status == '대여 중') {
        status.style.backgroundColor = '#D8D8D8'
        const remainTime = document.createElement('span')
        remainTime.style.cssText = `margin: 0 20px; color: gray;`
        remainTime.innerText = data.remain_time
        const itemBoxStatus = document.getElementsByClassName('item-box-status')
        itemBoxStatus[0].append(remainTime)
    }
    else if (data.status == '대여 가능') {
        status.style.backgroundColor = 'rgb(191, 255, 194)'
    }
    else if (data.status == '대여 종료') {
        status.style.backgroundColor = '#F28686'
    }

    // 제목
    const title = document.getElementById('title')
    title.innerText = data.title

    // 작성 시간
    const createdAt = document.getElementById('created-at')
    createdAt.innerText = data.created_at

    // 카테고리
    const category = document.getElementById('category')
    category.innerText = data.category

    // 시간 당 대여료
    const price = document.getElementById('price')
    const timeUnit = document.getElementById('time-unit')
    price.innerText = `${data.price.toLocaleString('ko-KR')}원 /`
    timeUnit.innerText = data.time_unit

    // 내용
    const postContent = document.getElementById('post-content')
    postContent.innerText = data.content

    // 찜 카운트
    const bookmarks = document.getElementById('bookmarks')
    bookmarks.innerText = data.bookmark_length
    
    // 문의 카운트
    const inquiries = document.getElementById('inquiries')
    inquiries.innerText = data.inquiry_length

    // 찜 버튼
    const bookmarkBtn = document.getElementsByClassName('bookmark-btn')
    if (data.is_bookmark == true) {
        bookmarkBtn[0].style.backgroundColor = '#ffe398'
        bookmarkBtn[0].innerText = '찜 취소하기'
    }
    else if (data.is_bookmark == false) {
        bookmarkBtn[0].style.backgroundColor = '#c4c4c4'
        bookmarkBtn[0].innerText = '찜 하기'
    }


    // 리뷰 섹션
    const reviewSection = document.getElementsByClassName('review-section')
    
    // 리뷰가 없을 시
    if (data.reviews.length == 0) {
        const reviewContainer = document.createElement('div')
        reviewContainer.setAttribute('class', 'review-container')
        reviewSection[0].append(reviewContainer)

        const noReview = document.createElement('p')
        noReview.innerText = '아직 리뷰가 없습니다'
        noReview.style.cssText = 'font-size: 20px; border-bottom: 0; color: gray;'
        reviewContainer.append(noReview)
    }
    
    // 리뷰가 있을 시
    else {
        for (i = data.reviews.length - 1; i >= 0; i--) {

            const reviewContainer = document.createElement('div')
            reviewContainer.setAttribute('class', 'review-container')
            reviewSection[0].append(reviewContainer)

            const reviewUserBox = document.createElement('div')
            reviewUserBox.setAttribute('class', 'review-user-box')
            reviewContainer.append(reviewUserBox)
            
            const reviewContentBox = document.createElement('div')
            reviewContentBox.setAttribute('class', 'review-content-box')
            reviewContainer.append(reviewContentBox)

            // 리뷰어 프로필 이미지
            const reviewUserImage = document.createElement('img')
            reviewUserImage.setAttribute('src', data.reviews[i].image)
            
            // 리뷰어 닉네임
            const reviewUserNickname = document.createElement('span')
            reviewUserNickname.innerText = data.reviews[i].nickname
            
            reviewUserBox.append(reviewUserImage, reviewUserNickname)

            // 리뷰어 내용
            const reviewContent = document.createElement('span')
            reviewContent.innerText = data.reviews[i].content
            
            // 작성 시간
            const reviewCreatedAt = document.createElement('span')
            reviewCreatedAt.innerText = data.reviews[i].created_at

            reviewContentBox.append(reviewContent, reviewCreatedAt)

            // 대여 기간
            const period = document.createElement('p')
            period.innerText = data.reviews[i].period
            reviewContainer.append(period)
        }
    }
}


// 찜 버튼 클릭
async function bookmark() {
    if (UserId == null) {
        alert('로그인 후 이용가능합니다')
    }
    else {
        // API 기능 호출
        let bookmarkData = await DetailViewPostApi()
        
        const bookmarkBtn = document.getElementsByClassName('bookmark-btn')
        if (bookmarkData.is_bookmark == true) {
            bookmarkBtn[0].style.backgroundColor = '#ffe398'
            bookmarkBtn[0].innerText = '찜 취소하기'
        }
        else if (bookmarkData.is_bookmark == false) {
            bookmarkBtn[0].style.backgroundColor = '#c4c4c4'
            bookmarkBtn[0].innerText = '찜 하기'
        }

        const bookmarks = document.getElementById('bookmarks')
        bookmarks.innerText = bookmarkData.bookmark_length
    }
}


// 문의하기 버튼 클릭
async function inquiry() {

    // 모달 바디 추가
    const body = document.getElementsByTagName('body')
    body[0].style.overflow = 'hidden' // 스크롤 히든

    const inquiryModalBody = document.createElement('div')
    inquiryModalBody.setAttribute('class', 'inquiry-modal-body')
    body[0].append(inquiryModalBody)

    // 모달 컨테이너 추가
    const inquiryModalContainer = document.createElement('div')
    inquiryModalContainer.setAttribute('class', 'inquiry-modal-container')
    inquiryModalBody.append(inquiryModalContainer)

    // 모달 텍스트 추가
    const inquiryModalText = document.createElement('p')
    inquiryModalText.innerText =
        `확인 버튼을 누르면 채팅으로 게시자와 연결됩니다
        문의하시겠습니까?`
    inquiryModalContainer.append(inquiryModalText)

    // 모달 버튼 박스 추가
    const inquiryModalBtnBox = document.createElement('div')
    inquiryModalBtnBox.setAttribute('class', 'inquiry-modal-btn-box')
    inquiryModalContainer.append(inquiryModalBtnBox)
    
    // 모달 버튼 추가
    const inquiryModalEnterBtn = document.createElement('button')
    inquiryModalEnterBtn.innerText = '확인'
    const inquiryModalCancelBtn = document.createElement('button')
    inquiryModalCancelBtn.innerText = '취소'
    inquiryModalBtnBox.append(inquiryModalEnterBtn, inquiryModalCancelBtn)

    // 모달 확인 버튼 클릭시
    inquiryModalEnterBtn.addEventListener('click', function() {
        body[0].style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 취소 버튼 클릭시
    inquiryModalCancelBtn.addEventListener('click', function() {
        body[0].style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 박스 바깥 클릭시
    inquiryModalBody.addEventListener('click', function(e) {
        if (e.target == inquiryModalBody) {
            body[0].style.overflow = 'auto'
            inquiryModalBody.style.display = 'none'
        }
    })
}

getDetailView()