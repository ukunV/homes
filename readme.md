# homes-app
통합 주택관리 Homes

## ⛳ Motivation and Core Function
- 통합적인 관리가 이루어지는 아파트 단지와 달리 대학가, 주택가 등 일반 임대형 주택에서는 건물에 대한 관리가 이루어지기 힘들고, 건물주와 세입자와의 소통이 어려움
- **건물주**
    - 소유 건물 입주현황 관리
    - 월세, 전세, 보증금 통합 관리 → 세입자 알림
- **세입자**
    - 월세, 전세 내역 관리
    - 건물 하자 관련 관리인/건물주 수리 의뢰
    - 세입자간 쪽지알림 (층간소음 등)
- **관리인**
    - 세입자 통합 알림 (분리수거, 소방점검 등)
    - 관리 건물 유지보수 통합 관리

## Start

1. You need to install basic tools and Docker (If you already have all requirements, skip this step)
```bash
sudo apt-get update
sudo apt-get install -y wget
sudo wget -qO- https://get.docker.com/ | sh
```

2. Clone this git and change permission of auto-script
```bash
git clone https://github.com/zinirun/homes-app
chmod +x homes-app/database-app/build_n_run.sh
chmod +x homes-app/build_n_run.sh
```

3. Run database container with auto-script and **wait at least 30 seconds** (Database will be initialized)
```bash
./<project folder>/database-app/build_n_run.sh
```

4. Run node container with auto-script
```bash
./<project folder>/build_n_run.sh
```