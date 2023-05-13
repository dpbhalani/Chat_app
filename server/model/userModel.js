const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAB6CAMAAAB0kGqaAAAAQlBMVEX39/eDg4Pz8/OTk5P7+/t+fn7///97e3t4eHifn5+3t7fBwcGzs7OoqKjn5+fS0tKMjIzZ2dnh4eHt7e2ZmZnKyso9Fb/pAAADeklEQVR4nO2b2W7rMAxELZtabHmLl///1SsnKeoErUW28qi48Dz1pcDBiKJokimKS5cu/XciImMMPRX+yA20KVCU0231bdfVd3Wtv5XZ2YiGtnLOWas/ZZ3rJpMTjYpVaa2+kNZ1n4+M5sp+RfVAUz7XedLwPdYmq/KYRuuXh/ji2pqBjCYX4wqmNQYONsexglyL9sx00YN8eOaxnlHP4wpxNkE9I88G66CW0cIFU7ZEgpWMK/mUG4BnSTc+GPQsjT9O+i9gNY6LnSzuGmcg2cLnUhr4ZJaVAMzecGC9gEtZ3LUkGZjHgd34lzKAtbB8ESsRX6WBYII0tiUyGJgkv15gfxqMVhEY7hWnm+CpRKaLYh4lYMCPOKolYMBKURT9yOpCUsFi67FCEP1LgXSMH/26niYYWCm5laPtYJaJ0kXwDAYmKq1D3YOrFGtJ6tcNDMy0IjDc1wgNgjymFC6R0SwBG5H9HkH0Q5sX1PCDDPmIhyATRD/0rZzZYMD0usmwMxm4PcxPGA7a6gyvErMTZdGdfmatqEewYeyOOrbNfxen3+kG/DCJ1YxyeKyCM+fSVQbDOOUisBLbi6JBppHP5A4sPkuFPpOfMpFRl8O1hd90/Bmnu0xYsVSGbPO8gx3Wi9AK8R3sKMdmBDu+ly7DO/mh7jD4G3hl8VRspuRyLR7FJiTItvCLTKzpg68SH1zRXQJg12Kn0kdbK7rr8VzUOU5tDd+HMp73/WZX8NZRy+30YzdVylqwEdKgNjzJeCWaci094jipGEYJ1uZZeJzONo1IsKG1M230xZnbp2R6L7XrA003/UmxRlQOtSi4XqXVMpywhE1m9pX9OdYdzY3tnNY2E8xykkH492zLWqZiI9oi63dm7dDs2PYJJoVEZuh0CrP2bPVKv7NtM0uxHmspmmunH1+E8I/hGqY1a8emQrT9hO2es04wa4fmVDMZ4ZGeTvVks8pLjpTK5rQjfJdV3cwlo3JEYW3S7EXxeEcutZhg/EFRInE3UnvR/DaBNK/DJxwspwDjzXWOm0ungC2sk+SP/NKR8XoJonWPJHKs6BctLKcRa4lXtoGYSBXDMNkyaSoxui+inzekEqeRbPBYzK0RdHp9kEXBWD8DTK/4soFsJz6Z4kF2PIY5TfHnMhdYdMPyApODZQn+OBj5KosYtWKZR1GuS5cuZdY/syExUL16xqcAAAAASUVORK5CYII=",
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
