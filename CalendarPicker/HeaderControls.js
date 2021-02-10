import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';

export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    onPressMonth,
    onPressYear,
    months,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    monthTitleStyle,
    yearTitleStyle,
    textStyle,
    restrictMonthNavigation,
    maxDate,
    minDate,
    headingLevel,
    monthYearHeaderWrapperStyle,
    headerWrapperStyle,
    yearFormatter
  } = props;
  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[currentMonth];
  const year = currentYear;

  const disablePreviousMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(minDate, currentMonth, currentYear);
  const disableNextMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(maxDate, currentMonth, currentYear);

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={[styles.headerWrapper, headerWrapperStyle]}>
      <Controls
        disabled={disablePreviousMonth}
        label={previousTitle}
        component={previousComponent}
        onPressControl={onPressPrevious}
        styles={styles.previousContainer}
        textStyles={[styles.navButtonText, textStyle, previousTitleStyle]}
      />
      <View style={[styles.monthYearHeaderWrapper,monthYearHeaderWrapperStyle]}>
        <TouchableOpacity onPress={onPressMonth}
          accessible={false}
          activeOpacity={1}>
          <Text style={[styles.monthHeaderMainText, textStyle, monthTitleStyle]}
            testID={`header-month-${monthName}-${yearFormatter(year)}`}
            accessibilityLabel={Platform.OS === 'android' ? `header-month-${monthName}-${yearFormatter(year)}` : undefined}
            {...accessibilityProps}>
            {monthName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressYear}
          accessible={false}
          activeOpacity={1}>
          <Text style={[styles.yearHeaderMainText, textStyle, yearTitleStyle]}
            testID={`header-year-${monthName}-${yearFormatter(year)}`}
            accessibilityLabel={Platform.OS === 'android' ? `header-year-${monthName}-${yearFormatter(year)}` : undefined}>
            {yearFormatter ? yearFormatter(year) : year}
          </Text>
        </TouchableOpacity>
      </View>
      <Controls
        disabled={disableNextMonth}
        label={nextTitle}
        component={nextComponent}
        onPressControl={onPressNext}
        styles={styles.nextContainer}
        textStyles={[styles.navButtonText, textStyle, nextTitleStyle]}
      />
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  onPressMonth: PropTypes.func,
  onPressYear: PropTypes.func,
};
