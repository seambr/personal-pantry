import pandas as pd
import numpy as np
from pathlib import Path

data_paths = list(Path.cwd().glob("**/*.csv"))
data_paths

chunksize = 10**5
name_to_owner = []
for chunk in pd.read_csv(data_paths[0], chunksize=chunksize):

    for index, row in chunk.iterrows():

        owner, name, sub = row["brand_owner"], row["brand_name"], row["subbrand_name"]
        name_is_na = pd.isna(name)
        sub_is_na = pd.isna(sub)

        name_to_owner.append(
            (sub if not sub_is_na else owner, name if not name_is_na else owner, owner))


df_data = list(set(name_to_owner))

df = pd.DataFrame(df_data, columns=[
                  "brand_owner", "brand_name", "subbrand_name"])


df.to_csv("owner_name_sub.csv")
