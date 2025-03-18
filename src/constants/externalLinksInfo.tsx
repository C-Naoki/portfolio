export interface ResourcesProps {
  cite?: string
  paper?: string
  slides?: string
  poster?: string
  code?: string
  arXiv?: string
}

interface PublicationsProps {
  title: string
  awards: string[]
  resources: ResourcesProps
}

interface ExternalLinksInfoProps {
  github: string
  twitter: string
  linkedin: string
  orcid: string
  googlescholar: string
  zenn: string
  commit_api: string
  cv: string
  biography: Record<string, string>
  affiliation: Record<string, string>
  grants_awards: Record<string, string>
  misc: Record<string, string>
  publications: Record<string, PublicationsProps>
}

const externalLinksInfo: ExternalLinksInfoProps = {
  github: 'https://github.com/C-Naoki',
  twitter: 'https://twitter.com/c_naoki13',
  linkedin: 'https://www.linkedin.com/in/naoki-chihara-0a35a827a/',
  orcid: 'https://orcid.org/0009-0005-7061-8214',
  googlescholar: 'https://scholar.google.com/citations?user=pq2b3jQAAAAJ&hl=en&oi=sra',
  zenn: 'https://zenn.dev/naoki0103',
  commit_api: 'https://api.github.com/repos/C-Naoki/portfolio/commits?per_page=1',
  cv: 'https://c-naoki.github.io/CV/cv.pdf',
  biography: {
    link_makoto: 'http://www-bigdata.ist.osaka-u.ac.jp/professor/onizuka/onizuka_en.html',
    link_yasushi: 'https://www.dm.sanken.osaka-u.ac.jp/~yasushi/index-j.html',
    link_yasuko: 'https://www.dm.sanken.osaka-u.ac.jp/~yasuko/index.html',
    link_hwip: 'https://www.humanware.osaka-u.ac.jp/en/'
  },
  affiliation: {
    laboratory: 'https://www.dm.sanken.osaka-u.ac.jp/',
    SANKEN: 'https://www.sanken.osaka-u.ac.jp/en/',
    graduate: 'https://www.ist.osaka-u.ac.jp/english/',
    university: 'https://www.osaka-u.ac.jp/en'
  },
  grants_awards: {
    'deim2025-presentation': 'https://pub.confit.atlas.jp/ja/event/deim2025/content/awards',
    yamashita: 'https://www.ipsj.or.jp/award/yamasita2024-detail.html#dbs',
    deim2024: 'https://confit.atlas.jp/guide/event/deim2024/static/awards',
    hwip: 'https://www.humanware.osaka-u.ac.jp/en/'
  },
  misc: {
    pandacco: 'https://pandacco.web.app/'
  },
  publications: {
    // 2025
    DEIM2025: {
      title: 'https://pub.confit.atlas.jp/ja/event/deim2025/presentation/4D-03',
      awards: [
        'https://pub.confit.atlas.jp/ja/event/deim2025/content/awards'
      ],
      resources: {
        paper: '/assets/DEIM2025/paper.pdf',
        slides: '/assets/DEIM2025/slides.pdf',
        poster: '/assets/DEIM2025/poster.pdf'
      }
    },
    KDD2025: {
      title: 'https://doi.org/10.1145/3690624.3709283',
      awards: [],
      resources: {
        paper: '/assets/KDD2025/paper.pdf',
        code: 'https://github.com/C-Naoki/ModePlait',
        arXiv: 'https://arxiv.org/abs/2502.08963'
      }
    },
    // 2024
    KDDPC2024: {
      title: 'https://kdd2024.kdd.org/ph-d-consortium/',
      awards: [],
      resources: {
        paper: '/assets/KDDPC2024/paper.pdf',
        poster: '/assets/KDDPC2024/poster.pdf'
      }
    },
    DEIM2024: {
      title: 'https://confit.atlas.jp/guide/event/deim2024/subject/T2-B-6-02/advanced',
      awards: [
        'https://confit.atlas.jp/guide/event/deim2024/static/awards',
        'https://www.ipsj.or.jp/award/yamasita2024-detail.html#dbs'
      ],
      resources: {
        paper: '/assets/DEIM2024/paper.pdf',
        slides: '/assets/DEIM2024/slides.pdf',
        poster: '/assets/DEIM2024/poster.pdf'
      }
    },
    DAS2024: {
      title: 'https://sites.google.com/sice-das.org/das36th/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0',
      awards: [],
      resources: {}
    },
    TOD101: {
      title: 'https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=233825&item_no=1&page_id=13&block_id=8',
      awards: [],
      resources: {
        paper: '/assets/TOD101/paper.pdf',
        cite: '/assets/TOD101/bibtex.txt'
      }
    },
    // 2023
    AstronComput45: {
      title: 'https://www.sciencedirect.com/science/article/pii/S221313372300080X',
      awards: [],
      resources: {
        paper: '/assets/AstronComput45/paper.pdf',
        cite: '/assets/AstronComput45/bibtex.txt'
      }
    },
    DEIM2023: {
      title: 'https://proceedings-of-deim.github.io/DEIM2023/#4a-6',
      awards: [],
      resources: {
        paper: '/assets/DEIM2023/paper.pdf',
        slides: '/assets/DEIM2023/slides.pdf',
        poster: '/assets/DEIM2023/poster.pdf'
      }
    },
    kenshutsu2023: {
      title: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202503009056531197',
      awards: [],
      resources: {}
    }
  }
}

export default externalLinksInfo
