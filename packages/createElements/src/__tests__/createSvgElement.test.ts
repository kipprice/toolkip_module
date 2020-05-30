import { createSVGElement } from '../createElement';
import { SVG_NAMESPACE } from '../_constants';
import { svgRectToBasicRect } from '../../../maths/typings';

describe('SVG creation', () => {
    it('creates an SVG element with the right namespace', () => {
        const svg = createSVGElement({ id: 'svg' });
        expect(svg.tagName).toEqual("svg");
        expect(svg.namespaceURI).toEqual(SVG_NAMESPACE)
    })

    it('forces a namespace', () => {
        const svg = createSVGElement({ id: 'svg', namespace: 'kipprice.com' });
        expect(svg.namespaceURI).toEqual(SVG_NAMESPACE)
    })

    it('allows for nesting', () => {
        const shapes = {
            rect: null,
            circle: null
        }
        const svg = createSVGElement({
            id: 'svg',
            children: [
                { type: 'rect', key: 'rect' },
                { type: 'circle', key: 'circle' }
            ]
        }, shapes);
        
        expect(svg.namespaceURI).toEqual(SVG_NAMESPACE);
        expect(shapes.circle.tagName).toEqual('circle');
        expect(shapes.rect.tagName).toEqual('rect');
    })
})