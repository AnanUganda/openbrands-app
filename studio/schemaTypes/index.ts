import blockContent from './blockContent'
import post from './post'
import portfolio from './portfolio'

// Two content collections: Blog (post) and Portfolio.
// blockContent is a shared rich-text object, not a collection.
export const schemaTypes = [post, portfolio, blockContent]
