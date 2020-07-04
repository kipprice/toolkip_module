import { createCssClass } from '../helpers';
import { StyleLibrary } from '../styleLibrary';

describe('createClass', () => {
    it('can modify values with the same  key', () => {
        createCssClass('.hello', { fontSize: '10pt' }, 'repeat');
        createCssClass('.hello', { fontWeight: 'bold' }, 'repeat');
        expect(StyleLibrary.get('repeat')).toMatchObject({ 
            '.hello': { 
                fontSize: '10pt', 
                fontWeight: 'bold' 
            }
        })
    })

    it('does not add duplicate values', () => {
        createCssClass('.hello', { fontSize: '0pt' }, 'repeat');
        createCssClass('.hello', { fontSize: '0pt' }, 'repeat');
        expect(StyleLibrary.get('repeat')).toMatchObject({ 
            '.hello': { 
                fontSize: '0pt'
            }
        })
    })
})