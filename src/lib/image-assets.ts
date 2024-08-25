import { AssetIcon, MapIcon } from './validate-snapshot';
import map01Icon from '@/assets/map-01.svg';
import map02Icon from '@/assets/map-01.svg';
import person01Icon from '@/assets/person-01.svg';
import person02Icon from '@/assets/person-02.svg';
import person03Icon from '@/assets/person-03.svg';
import person04Icon from '@/assets/person-04.svg';

export const getAssetByIcon = (icon: NonNullable<AssetIcon>) => {
  return {
    'person-01': person01Icon,
    'person-02': person02Icon,
    'person-03': person03Icon,
    'person-04': person04Icon,
  }[icon];
};

export const getMapByIcon = (icon: NonNullable<MapIcon>) => {
  return {
    'map-01': map01Icon,
    'map-02': map02Icon,
  }[icon];
};
