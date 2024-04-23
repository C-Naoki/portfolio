interface PublicationDetails {
  authors: string[]
  title: string
  venue: string
}

export interface ResourcesProps {
  paper: string
  slides?: string
  poster?: string
  code?: string
}

interface PublicationJaProps {
  ja: PublicationDetails
  en?: PublicationDetails
  resources: ResourcesProps
  url: string
}

interface PublicationEnProps {
  ja?: PublicationDetails
  en: PublicationDetails
  resources: ResourcesProps
  url: string
}

type PublicationsProps = Record<string, PublicationJaProps | PublicationEnProps>

const publicationsInfo: PublicationsProps = {
  // 2024
  DEIM2024: {
    ja: {
      authors: ['千原 直己', '松原 靖子', '藤原 廉', '櫻井 保志'],
      title: '動的モード分解を活用した高速将来予測アルゴリズム',
      venue: '第16回データ工学と情報マネジメントに関するフォーラム (DEIM2024), T2-B-6-02, 2024'
    },
    resources: {
      paper: '/assets/DEIM2024/paper.pdf',
      slides: '/assets/DEIM2024/slides.pdf',
      poster: '/assets/DEIM2024/poster.pdf'
    },
    url: ''
  },
  TOD101: {
    ja: {
      authors: ['千原 直己', '松原 靖子', '藤原 廉', '櫻井 保志'],
      title: '動的モード分解による時系列データストリームの将来予測',
      venue: '情報処理学会論文誌データベース (TOD), Vol. 17, No. 2, pp. 1-11, 2024年4月23日'
    },
    en: {
      authors: ['Naoki Chihara', 'Yasuko Matsubara', 'Ren Fujiwara', 'Yasushi Sakurai'],
      title: 'Real-time Forecasting of Time-evolving Data Streams using Dynamic Mode Decomposition',
      venue: 'IPSJ Transactions on Databases (TOD), Vol. 17, No. 2, pp. 1-11, 23 April 2024'
    },
    resources: {
      paper: '/assets/TOD101/paper.pdf'
    },
    url: 'https://ipsj.ixsq.nii.ac.jp/ej/index.php?action=pages_view_main&active_action=repository_view_main_item_snippet&index_id=11595&pn=1&count=20&order=7&page_id=13&block_id=8'
  },
  // 2023
  AstronComput45: {
    en: {
      authors: ['Naoki Chihara', 'Tadafumi Takata', 'Yasuhiro Fujiwara', 'Koki Noda', 'Keisuke Toyoda', 'Kaito Higuchi', 'Makoto Onizuka'],
      title: 'Effective detection of variable celestial objects using machine learning-based periodic analysis',
      venue: 'Astronomy and Computing, Vol. 45, pp. 100765, 3 November 2023.'
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
      venue: '第15回データ工学と情報マネジメントに関するフォーラム (DEIM2023), 4a-6-3, 2023'
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
