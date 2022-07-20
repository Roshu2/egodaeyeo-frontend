// 페이지 뷰
async function UploadPageView() {

    const data = await getUploadPageViewData()

    const categorySelect = document.getElementById('category')
    
    // 카테고리
    for (let i = 0; i < data.length; i++) {
        const category = document.createElement('option')
        category.setAttribute('value', data[i].name)
        category.innerText = `# ${data[i].name}`
        categorySelect.append(category)
    }
}


let fileNo = 0
let filesArr = new Array()
let previewArr = new Array()

// 이미지 첨부 시
function imgUpload(obj) {

    let maxFileCnt = 5   // 첨부파일 최대 개수
    let attFileCnt = document.querySelectorAll('.filebox').length    // 기존 추가된 첨부파일 개수
    let remainFileCnt = maxFileCnt - attFileCnt    // 추가로 첨부가능한 개수
    let curFileCnt = obj.files.length  // 현재 선택된 첨부파일 개수
    
    // 첨부파일 개수 확인
    // 최대 개수 초과 시
    if (curFileCnt > remainFileCnt) {
        alert("이미지는 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.")
    }

    // 최대 개수 넘지 않았을 시
    else {
        for (const file of obj.files) {
            const prImg = document.getElementById('pr-img')
            // 총 첨부된 이미지가 0, 3개 있을 시
            if (attFileCnt + curFileCnt == 0 || attFileCnt + curFileCnt == 3) {
                prImg.style.justifyContent = 'center'
            } 
            else {
                prImg.style.justifyContent = 'normal'
            }

            // 이미지 미리보기
            let img = new Image()
            img.onload = function() {
                previewArr.push(file)
            }
            img.src = URL.createObjectURL(file)
            
            let previewHtmlData = img
            previewHtmlData.setAttribute('id', `preview-img-${fileNo}`)
            $('.file-input-custom').before(previewHtmlData)

            // 파일 배열에 담기
            let reader = new FileReader()
            reader.onload = function() {
                filesArr.push(file)
            }
            reader.readAsDataURL(file)

            // 이미지 목록에 추가
            let htmlData = ''
            htmlData += '<div id="file' + fileNo + '" class="filebox">'
            htmlData += '   <p class="name">' + file.name + '</p>'
            htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ')">❌</a>'
            htmlData += '</div>'
            $('.file-list').append(htmlData)

            fileNo++
        }
    }
    // 초기화
    document.querySelector("input[type=file]").value = ""
}

// 첨부파일 삭제 
function deleteFile(num) {
    document.querySelector("#file" + num).remove()
    filesArr[num].is_delete = true

    let attFileCnt = document.querySelectorAll('.filebox').length

    document.querySelector("#preview-img-" + num).remove()
    previewArr[num].is_delete = true

    const prImg = document.getElementById('pr-img')
        // 총 첨부된 이미지가 0, 3개 있을 시
        if (attFileCnt == 0 || attFileCnt == 3) {
            prImg.style.justifyContent = 'center'
        }
        else {
            prImg.style.justifyContent = 'normal'
        }
}


UploadPageView()    // 페이지 뷰