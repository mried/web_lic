/* Web Lic - Copyright (C) 2018 Remi Gagne */

'use strict';

import _ from './util';

const api = {

	fixLicSaveFile(content) {

		const state = content.state;

		if (state.inventoryPages == null) {
			state.inventoryPages = [];
		}

		if (_.isEmpty(content.state.licFilename)) {
			state.licFilename = content.modelFilename.split('.')[0];
		}

		state.pages.forEach(page => {
			if (page.pliItems == null) {
				page.pliItems = [];
			}
		});

		state.steps.forEach(step => {
			if (step.stretchedPages == null) {
				step.stretchedPages = [];
			}
			if (step.annotations == null) {
				step.annotations = [];
			}
			if (step.displacedParts) {
				step.displacedParts.forEach(d => {
					if (d.hasOwnProperty('distance')) {
						d.partDistance = d.distance;
						delete d.distance;
					}
				});
			}
		});

		state.csis.forEach(csi => {
			if (csi.annotations == null) {
				csi.annotations = [];
			}
		});

		state.callouts.forEach(callout => {
			if (!callout.hasOwnProperty('borderOffset')) {
				callout.borderOffset = {x: 0, y: 0};
			}
			if (!callout.hasOwnProperty('position')) {
				callout.position = 'left';
			}
		});

		state.pliItems.forEach(pliItem => {
			delete pliItem.partNumbers;
		});

		if (state.template.submodelImage.maxHeight == null) {
			state.template.submodelImage.maxHeight = 0.3;
		}

		if (state.template.sceneRendering == null) {
			state.template.sceneRendering = {};
		}
		if (state.template.sceneRendering.zoom == null) {
			state.template.sceneRendering.zoom = 0;
		}
		if (state.template.sceneRendering.edgeWidth == null) {
			state.template.sceneRendering.edgeWidth = 4;
		}

		if (typeof content.colorTable[0].color === 'number') {
			_.forOwn(content.colorTable, v => {
				v.color = '#' + (v.color).toString(16).padStart(6, '0');
				v.edge = '#' + (v.edge).toString(16).padStart(6, '0');
			});
		}
	}
};

export default api;
