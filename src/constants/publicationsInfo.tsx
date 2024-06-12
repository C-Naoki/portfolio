interface PublicationDetails {
  authors: string[]
  title: string
  venue: string
  awards: string[]
}

export interface ResourcesProps {
  paper?: string
  slides?: string
  poster?: string
  code?: string
}

interface PublicationJaProps {
  ja: PublicationDetails
  en?: PublicationDetails
  resources?: ResourcesProps
  url: string
}

interface PublicationEnProps {
  ja?: PublicationDetails
  en: PublicationDetails
  resources?: ResourcesProps
  url: string
}

type PublicationsProps = Record<string, PublicationJaProps | PublicationEnProps>

const publicationsInfo: PublicationsProps = {
  // 2024
  DEIM2024: {
    ja: {
      authors: ['千原 直己', '松原 靖子', '藤原 廉', '櫻井 保志'],
      title: '動的モード分解を活用した高速将来予測アルゴリズム',
      venue: '第16回データ工学と情報マネジメントに関するフォーラム (DEIM2024), 兵庫, T2-B-6-02, 2024年2月29日',
      awards: ['優秀論文賞']
    },
    en: {
      authors: ['Naoki Chihara', 'Yasuko Matsubara', 'Ren Fujiwara', 'Yasushi Sakurai'],
      title: '動的モード分解を活用した高速将来予測アルゴリズム',
      venue: 'The 16th Forum on Data Engineering and Information Management (DEIM2024), Hyogo, Japan, T2-B-6-02, February 29, 2024.',
      awards: ['Best Paper Award Runner-up']
    },
    resources: {
      paper: '/assets/DEIM2024/paper.pdf',
      slides: '/assets/DEIM2024/slides.pdf',
      poster: '/assets/DEIM2024/poster.pdf'
    },
    url: 'https://confit.atlas.jp/guide/event/deim2024/subject/T2-B-6-02/advanced'
  },
  DAS2024: {
    ja: {
      authors: ['李 艾義', '星牟禮 健也', '谷垣 慶', '波多野 遥太', '能澤 伶奈', '坂本 有紀', '韋 遠舟', '千原 直己', '小谷 尚輝'],
      title: 'Semi-autonomous Leader-follower Approach for Swarm Drone Guidance',
      venue: '第36回自律分散システム・シンポジウム, 東京, 1C2-4, 2024年2月16日',
      awards: ['']
    },
    en: {
      authors: ['Aiyi Li', 'Kenya Hoshimure', 'Kei Tanigaki', 'Yota Hatano', 'Reina Nozawa', 'Yuki Sakamoto', 'Yuanzhou Wei', 'Naoki Chihara', 'Naoki Kodani'],
      title: 'Semi-autonomous Leader-follower Approach for Swarm Drone Guidance',
      venue: 'The 36th SICE Symposium on Decentralized Autonomous Systems, Tokyo, Japan, 1C2-4, February 16, 2024.',
      awards: ['']
    },
    url: 'https://sites.google.com/sice-das.org/das36th/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0'
  },
  TOD101: {
    ja: {
      authors: ['千原 直己', '松原 靖子', '藤原 廉', '櫻井 保志'],
      title: '動的モード分解による時系列データストリームの将来予測',
      venue: '情報処理学会論文誌データベース (TOD), Vol. 17, No. 2, pp. 1-11, 2024年4月23日',
      awards: ['']
    },
    en: {
      authors: ['Naoki Chihara', 'Yasuko Matsubara', 'Ren Fujiwara', 'Yasushi Sakurai'],
      title: 'Real-time Forecasting of Time-evolving Data Streams using Dynamic Mode Decomposition',
      venue: 'IPSJ Transactions on Databases (TOD), Vol. 17, No. 2, pp. 1-11, April 23, 2024.',
      awards: ['']
    },
    resources: {
      paper: '/assets/TOD101/paper.pdf'
    },
    url: 'https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=233825&item_no=1&page_id=13&block_id=8'
  },
  // 2023
  AstronComput45: {
    en: {
      authors: ['Naoki Chihara', 'Tadafumi Takata', 'Yasuhiro Fujiwara', 'Koki Noda', 'Keisuke Toyoda', 'Kaito Higuchi', 'Makoto Onizuka'],
      title: 'Effective detection of variable celestial objects using machine learning-based periodic analysis',
      venue: 'Astronomy and Computing, Vol. 45, pp. 100765, November 3, 2023.',
      awards: ['']
    },
    resources: {
      paper: 'assets/AstronComput45/paper.pdf'
    },
    url: 'https://www.sciencedirect.com/science/article/pii/S221313372300080X'
  },
  DEIM2023: {
    ja: {
      authors: ['千原 直己', '高田 唯史', '藤原 靖宏', '鬼塚 真'],
      title: '周期解析による変動天体の検出',
      venue: '第15回データ工学と情報マネジメントに関するフォーラム (DEIM2023), 岐阜, 4a-6-3, 2023年3月6日',
      awards: ['']
    },
    en: {
      authors: ['Naoki Chihara', 'Tadafumi Takata', 'Yasuhiro Fujiwara', 'Makoto Onizuka'],
      title: '周期解析による変動天体の検出',
      venue: 'The 15th Forum on Data Engineering and Information Management (DEIM2023), Gifu, Japan, 4a-6-3, March 6, 2023.',
      awards: ['']
    },
    resources: {
      paper: '/assets/DEIM2023/paper.pdf',
      slides: '/assets/DEIM2023/slides.pdf',
      poster: '/assets/DEIM2023/poster.pdf'
    },
    url: 'https://proceedings-of-deim.github.io/DEIM2023/#4a-6'
  }
}

export default publicationsInfo
