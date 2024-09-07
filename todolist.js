// 현재 날짜 업데이트 함수
function updateDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  document.getElementById('current-date').textContent = `DATE: ${year}년 ${month}월 ${day}일`;
}

// 할 일 항목 추가 함수
function addItem() {
  let itemName = document.getElementById('item');
  
  // 빈 입력 방지
  if (itemName.value.trim() === '') {
      alert('할 일을 입력하세요.');
      return;
  }

  let newItem = document.createElement('li');
  newItem.className = 'list-item';

  // 체크박스 생성
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  // 체크박스 이벤트: 체크 시 완료 표시
  checkbox.addEventListener('change', function() {
      if (this.checked) {
          newItem.classList.add('completed');
      } else {
          newItem.classList.remove('completed');
      }
  });

  // 텍스트를 span으로 감싸서 추가
  let itemText = document.createElement('span');
  itemText.textContent = itemName.value; // 할 일 텍스트를 추가

  // 삭제 버튼 생성
  let deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';
  deleteButton.className = 'delete-btn';
  deleteButton.onclick = function() {
      deleteItem(deleteButton);
  };

  // 리스트 아이템에 체크박스, 텍스트, 삭제 버튼 추가
  newItem.appendChild(checkbox);
  newItem.appendChild(itemText); 
  newItem.appendChild(deleteButton);

  // 새로운 항목을 목록의 마지막에 추가
  let list = document.getElementById('list');
  list.appendChild(newItem); // 항목을 리스트의 마지막에 추가

  // 스크롤을 리스트의 가장 아래로 이동
  list.scrollTop = list.scrollHeight;

  // 입력 필드 초기화 및 포커스
  itemName.value = '';
  itemName.focus();

  // 카운터 업데이트
  updateCounter();
}

// 항목 삭제 함수
function deleteItem(item) {
  item.parentNode.remove();
  updateCounter();
}

// 모든 항목 삭제 함수
function deleteAll() {
  document.getElementById('list').innerHTML = '';
  updateCounter();
}

// 할 일 개수 카운터 업데이트 함수
function updateCounter() {
  let items = document.querySelectorAll('.list-item');
  document.getElementById('counter').textContent = `You have ${items.length} pending tasks`;
}

// Enter 키로 아이템 추가 이벤트
document.getElementById('item').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      addItem();
  }
});

// 현재 날짜 업데이트를 매초마다 실행
setInterval(updateDate, 1000);

// 페이지 로드 시 바로 날짜 업데이트
updateDate();
