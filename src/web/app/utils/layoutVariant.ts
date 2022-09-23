export enum LayoutVariant {
  leftRight = 'leftRight',
  rightLeft = 'rightLeft'
}

export const layoutVariantsOptions = Object.entries(LayoutVariant).map(
  ([key, value]) => ({ label: key, value })
);

export const getLayoutVariantFlexDirection = (layoutVariant: LayoutVariant) => {
  if (layoutVariant === LayoutVariant.rightLeft) {
    return 'row-reverse';
  }

  return 'row';
};

export const getContentRightMargin = (layoutVariant: LayoutVariant) => {
  if (layoutVariant === LayoutVariant.rightLeft) {
    return 4;
  }

  return 0;
};

export const getContentLeftMargin = (layoutVariant: LayoutVariant) => {
  if (layoutVariant === LayoutVariant.rightLeft) {
    return 0;
  }

  return 4;
};
