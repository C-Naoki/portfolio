import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';


const LanguageSwitcher = () => {
  const router = useRouter();

  const handleLocaleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const locale = event.target.value as string;
    router.push(router.pathname, router.asPath, { locale });
  };

  const CustomFormControl = withStyles({
    root: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  })(FormControl);


  return (
    <CustomFormControl variant="outlined">
      <Select
        labelId="language-select-label"
        id="language-select"
        value={router.locale}
        onChange={handleLocaleChange}
        renderValue={(value) => (
          <Typography variant="button" style={{ color: 'white' }}>{value === 'ja' ? '🇯🇵 Ja' : '🇺🇸 En'}</Typography>
        )}
      >
        <MenuItem value="en">🇺🇸 EN</MenuItem>
        <MenuItem value="ja">🇯🇵 JA</MenuItem>
      </Select>
    </CustomFormControl>
  );
};

export default LanguageSwitcher;
