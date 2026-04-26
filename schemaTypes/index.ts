import {blockContent} from './blockContent'
import {siteSettings} from './siteSettings'
import {suburb} from './suburb'
import {problem} from './problem'
import {icpLanding} from './icpLanding'
import {campaign} from './campaign'
import {caseStudy} from './caseStudy'
import {gallery} from './gallery'
import {testimonial} from './testimonial'
import {teamMember} from './teamMember'
import {serviceArea} from './serviceArea'
import {fussTaxPage} from './fussTaxPage'

export const schemaTypes = [
  // Shared object types
  blockContent,
  // Singletons
  siteSettings,
  fussTaxPage,
  // Documents
  suburb,
  problem,
  icpLanding,
  campaign,
  caseStudy,
  gallery,
  testimonial,
  teamMember,
  serviceArea,
]
